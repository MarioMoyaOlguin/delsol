import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

import { Chart } from 'chart.js';
import 'chartjs-plugin-colorschemes';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { fade, fadeOut } from 'src/app/animations';

@Component({
  selector: 'app-polls-charts',
  templateUrl: './polls-charts.component.html',
  styleUrls: ['./polls-charts.component.scss'],
  animations: [
    fade,
    fadeOut
  ],
})
export class PollsChartsComponent implements OnInit {

  @Input() chartsArray:any
  @Input() nombreEncuesta:any

  constructor() {
    
  }

  /* -------------------------------- Variables ------------------------------- */
  ngOnInit(): void {
    this.arrangeCharts()
  }
  ngAfterViewInit():void {
    this.generateCharts();
  }

  loading = false;
  chartsBySectionsArray:any = [];
  promisesArray:any = [];
  
  colorOptions = {
    colorschemes: { scheme: 'brewer.RdYlGn4' }
  }
  bgColors10 = ["#9e0142","#d73027","#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"]
  
  @ViewChild('chartsContainer') charts:any;

  /* ---------------------------- Generar graficas ---------------------------- */
  generateCharts = () => {
    for (let i = 0; i < this.chartsBySectionsArray.length; i++) { //Array secciones de 8 graficas

      for (let j = 0; j < this.chartsBySectionsArray[i].length; j++) { // seccion
        const chartContext = this.charts.nativeElement.children[i].children[i === 0 ? j+1 : j].children[1].children[0]
          .getContext('2d', { willReadFrequently: true });
        
        switch (this.chartsBySectionsArray[i][j].type) {
          case 'estrellas':
            new Chart(chartContext, {
              type: 'horizontalBar',
              data: {
                  datasets: [{
                      label: 'Current Value',
                      data: this.chartsBySectionsArray[i][j].data,
                      fill: true,
                      backgroundColor: ["#d7191c", "#ff0505", "#fdae61", "#a6d96a", "#66bd63"],
                  }],
                  labels: ['1 estrella', '2 estrellas', '3 estrellas', '4 estrellas', '5 estrellas']
              },
              options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend: {
                  display: false //Esconder etiqueta de datasets
                }
              }
            });          
            break;
        
          case 'calificacion':
            new Chart(chartContext, {
              type: 'bar',
              data: {
                  datasets: [{
                      label: 'Current Value',
                      data: this.chartsBySectionsArray[i][j].data,
                      fill: true,
                      backgroundColor: this.bgColors10,
                  }],
                  labels: ['1','2','3','4','5','6','7','8','9','10']
              },
              options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend: {
                  display: false //Esconder etiqueta de datasets
                }
              }
            }); 
            break;
  
          case 'nps':
            new Chart(chartContext, {
              type: 'doughnut',
              data: {
                labels: this.chartsBySectionsArray[i][j].labels,
                datasets: [{
                  data: this.chartsBySectionsArray[i][j].data
                }]
              },
              options: {
                plugins: this.colorOptions,
              }
            });
            break;
  
          case 'opcion':
            new Chart(chartContext, {
              type: 'pie',
              data: {
                labels: this.chartsBySectionsArray[i][j].labels,
                datasets: [{
                  data: this.chartsBySectionsArray[i][j].data
                }]
              },
              options: {
                plugins: this.colorOptions,
              }
            });
            break;
        }
      }
    }
  } //fin generate charts

  /* ---------------- Generar arreglos de 8 elementos cada uno ---------------- */
  arrangeCharts = () => {
    for (let j = 0; j < this.chartsArray.length; j++) {
      this.chartsArray[j] = {
        ...this.chartsArray[j],
        pregunta: j+1
      }
    }
    const chunkSize = 8;
    for (let i = 0; i < this.chartsArray.length; i += chunkSize) {
        const chunk = this.chartsArray.slice(i, i + chunkSize);
        this.chartsBySectionsArray.push(chunk);
    }
  }


  /* -------------------------------------------------------------------------- */
  /*                           Generar y descargar PDF                          */
  /* -------------------------------------------------------------------------- */

  /* ---------------------------- Array de imagenes --------------------------- */
   generateImages = (options:any) => {
    const tempImages:any = [];
    for (let i = 0; i < this.chartsBySectionsArray.length; i++) {
      const targetHtml = document.getElementById(`page${i}`);
      const promise = html2canvas(targetHtml!, options).then((canvas) => {
        const img = canvas.toDataURL('image/PNG');
        return img;
      });
      tempImages.push(promise)
    }
    return tempImages;
  }

  /* ------------------------------- Generar PDF ------------------------------ */
  generateCanvas = () => {
    this.loading = true;
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = { background: 'white', scale: 3, };

    forkJoin(this.generateImages(options)).subscribe( (results:any) => {
      for (let i = 0; i < results.length; i++) {
        const bufferX = 10;
        const bufferY = 24;
        const imgProps = (doc as any).getImageProperties(results[i]);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        if(i > 0) {
          doc.addPage("a4", 'p');
        }
        doc.setTextColor(244, 50, 62);
        doc.setFontSize(14);
        doc.text(`${i+1} / ${results.length}`, 550, 20);
        doc.addImage(results[i], 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      }
      doc.save(`Encuesta - ${this.nombreEncuesta} - ${new Date().toISOString()}.pdf`);
      this.loading = false;
    })
  }
}
