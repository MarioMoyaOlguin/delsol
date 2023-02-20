import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { Chart } from 'chart.js';
import 'chartjs-plugin-colorschemes';

@Component({
  selector: 'app-polls-charts',
  templateUrl: './polls-charts.component.html',
  styleUrls: ['./polls-charts.component.scss']
})
export class PollsChartsComponent implements OnInit {

  @Input() chartsArray:any
  @Input() nombreEncuesta:any

  constructor() { }

  ngOnInit(): void {
    
  }
  ngAfterViewInit():void {
    this.generateCharts();
  }
  
  colorOptions = {
    colorschemes: {
      scheme: 'brewer.RdYlGn4'
    }
  }
  bgColors10 = ["#9e0142","#d73027","#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"]
  
  @ViewChild('chartsContainer') charts:any;

  generateCharts = () => {
    for (let i = 0; i < this.chartsArray.length; i++) {
      const chartContext = this.charts.nativeElement.children[i].children[1].children[0].getContext('2d');

      switch (this.chartsArray[i].type) {
        case 'estrellas':
          new Chart(chartContext, {
            type: 'horizontalBar',
            data: {
                datasets: [{
                    label: 'Current Value',
                    data: this.chartsArray[i].data,
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
                    data: this.chartsArray[i].data,
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
                display: false //This will do the task
              }
            }
          }); 
          break;

        case 'nps':
          new Chart(chartContext, {
            type: 'doughnut',
            data: {
              labels: this.chartsArray[i].labels,
              datasets: [{
                data: this.chartsArray[i].data
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
              labels: this.chartsArray[i].labels,
              datasets: [{
                data: this.chartsArray[i].data
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

    


}
