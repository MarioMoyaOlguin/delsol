import { Component, OnInit, ViewChild } from '@angular/core';

import { Chart } from 'chart.js';
import 'chartjs-plugin-colorschemes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  colorOptions = {
    colorschemes: {
      scheme: 'brewer.RdYlGn4'
    }
  }

  linesCtx: any;
  doughnutCtx:any;
  pieCtx:any;
  polarAreaCtx:any;
  radarCtx:any;

  linesCanvas: any;
  doughnutCanvas:any;
  pieCanvas:any;
  polarAreaCanvas:any;
  radarCanvas:any;

  @ViewChild('linesChart') linesChart: any;
  @ViewChild('doughnutChart') doughnutChart: any;
  @ViewChild('pieChart') pieChart: any;
  @ViewChild('polarAreaChart') polarAreaChart: any;
  @ViewChild('radarChart') radarChart: any;

  ngAfterViewInit() {

    /* ---------------------------- Grafica de lineas --------------------------- */
    this.linesCanvas = this.linesChart.nativeElement;
    this.linesCtx = this.linesCanvas.getContext('2d');

    new Chart(this.linesCtx, {
      type: 'line',
      data: {
          datasets: [{
              label: 'Current Value',
              data: [0, 20, 40, 50],
              fill: true,
          },
          {
              label: 'Invested Amount',
              data: [0, 20, 40, 60, 80],
              fill: true,
          }],
          labels: ['January 2019', 'February 2019', 'March 2019', 'April 2019']
      },
      options: {
        plugins: this.colorOptions,
      }
    });

    /* ----------------------------- Grafica de dona ---------------------------- */
    this.doughnutCanvas = this.doughnutChart.nativeElement;
    this.doughnutCtx = this.doughnutCanvas.getContext('2d');

    new Chart(this.doughnutCtx, {
      type: 'doughnut',
      data: {
        labels: ['Red', 'Melon', 'Light Green'],
        datasets: [{
          data: [300, 50, 100]
        }]
      },
      options: {
        plugins: this.colorOptions,
      }
    });

    /* ----------------------------- Grafica de pay ----------------------------- */
    this.pieCanvas = this.pieChart.nativeElement;
    this.pieCtx = this.pieCanvas.getContext('2d');

    new Chart(this.pieCtx, {
      type: 'pie',
      data: {
        labels: ['Red', 'Melon', 'Light Green'],
        datasets: [{
          data: [300, 50, 100]
        }]
      },
      options: {
        plugins: this.colorOptions,
      }
    });

    /* ------------------------------ Grafica area polar ----------------------------- */
    this.polarAreaCanvas = this.polarAreaChart.nativeElement;
    this.polarAreaCtx = this.polarAreaCanvas.getContext('2d');

    new Chart(this.polarAreaCtx, {
      type: 'polarArea',
      data: {
        labels: ['Red', 'Melon', 'Light Green', 'Green', 'Red'],
        datasets: [{
          label: 'My First Dataset',
          data: [11, 16, 7, 3, 14],
        }]
      },
      options: {
        plugins: this.colorOptions,
      }
    });

    /* ---------------------------- Grafica de radar ---------------------------- */
    this.radarCanvas = this.radarChart.nativeElement;
    this.radarCtx = this.radarCanvas.getContext('2d');

    new Chart(this.radarCtx, {
      type: 'radar',
      data: {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [{
          label: 'First Dataset',
          data: [65, 59, 90, 81, 56, 55, 40],
          fill: true,
        }, {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 96, 27, 100],
          fill: true,
        }, {
          label: 'third Dataset',
          data: [45, 42, 17, 20, 52, 86, 98],
          fill: true,
        }]
      },
      options: {
        plugins: this.colorOptions,
        elements: {
          line: {
            borderWidth: 2
          }
        }
      }
    });
  }


}
