import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import 'chartjs-plugin-colorschemes';
import { FirestoreService } from '../services/firestore.service';

import { fade, fadeOut } from '../animations';

import 'chartjs-plugin-colorschemes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    fade,
    fadeOut
  ],
})
export class DashboardComponent implements OnInit {

  constructor(private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.getAllPolls();
  }

  ngAfterViewInit() {
    
  }

  pollsArray:any[] = [];


  /* ---------- Obtener encuestas y generar grafica activas/inactivas --------- */
  pollExamChart = false;
  @ViewChild('pollExamData') generalData:any;

  getAllPolls = () => {
    this.firestore.getPolls().subscribe( resp => {
      console.log("resp: ", resp);
      this.pollsArray = resp;

      // Contar encuestas activas e inactivas
      let activePolls = 0;
      let inactivePolls = 0;
      for (let i = 0; i < resp.length; i++) {
        const poll = resp[i];
        if (poll['estado'] === 'activa') { activePolls++ }
        else { inactivePolls++ }
      }
      const data = [activePolls, inactivePolls];
      // Generar grafica
      const pollExamContext = this.generalData.nativeElement.getContext('2d', { willReadFrequently: true });
      new Chart(pollExamContext, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Current Value',
                data: data,
                fill: true,
                backgroundColor: ['#008700', '#f4323e'],
            }],
            labels: ['Activas','Inactivas']
        },
        options: {
          scales: {
              yAxes: [{
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
      this.pollExamChart = true;
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                  Generar graficas de encuesta seleccionada                 */
  /* -------------------------------------------------------------------------- */
  showCharts = false;
  pollTitle = '';
  charts:any[] = [];
  countedData:number[][] = [];

  setShowChart = () => { this.showCharts = !this.showCharts };

  setPollTitle = (index:number) => { this.pollTitle = this.pollsArray[index].titulo };

  getPollCharts = (poll:string) => {
    console.log("poll: ", poll);

    let index = 0;
    for (let i = 0; i < this.pollsArray.length; i++) {
      const titulo = this.pollsArray[i].titulo;
      if(titulo === poll) { index = i }
    }

    if(this.pollsArray[index].respuestas.length < 1) { return }
    this.setPollTitle(index);
    this.charts = [];
    const questions = this.pollsArray[index].preguntas.filter((question:any) => question.type !== 'texto' && question.type !== 'fecha' && question.type !== 'lista');
    console.log("questions: ", questions);
    const responsesArray = this.pollsArray[index].respuestas;
    // console.log("responsesArray: ", responsesArray);
    this.charts = questions;
    // Nuevo arreglo para recibir solo las respuestas
    let filteredResponses:any = [];
    //Obtener los numeros de pregunta para recibir las respuestas
    for (let i = 0; i < questions.length; i++) {
      const element = questions[i];
      filteredResponses.push({
        numeroPregunta: element.numeroPregunta,
        respuestas: []
      })
    }
    //Obtener respuestas respectivas a cada pregunta en el filteredResponses
    for (let i = 0; i < questions.length; i++) { //Por cada pregunta filtrada
      const numPregunta = questions[i].numeroPregunta;
      for (let j = 0; j < responsesArray.length; j++) {//Por cada vez que se contesta la encuesta
        for (let k = 0; k < responsesArray[j].respuestas.length; k++) {//Iterar el array de respuestas
          const numComparar = responsesArray[j].respuestas[k].questionNumber;
          const response = responsesArray[j].respuestas[k].response;
          if(numPregunta == numComparar) {
            filteredResponses[i].respuestas.push(response)
          }
        }
      }
    }
    let labelsData:any = [];
    let labelsArray:any = [];
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < filteredResponses.length; j++) {
        const element = filteredResponses[j];
        if(questions[i].numeroPregunta === element.numeroPregunta) {
          let labels:any = [];
          if(questions[i].type === 'opcion') {
            labels = questions[i].optionsArray.map( (item:any) => {
              return item.opcion
            });
          };
          if(questions[i].type === 'calificacion') { labels = ['1','2','3','4','5','6','7','8','9','10'] };
          if(questions[i].type === 'estrellas') { labels = ['1','2','3','4','5'] };
          if(questions[i].type === 'nps') { labels = ['1','2','3'] };
          labelsArray.push({
            numeroPregunta: questions[i].numeroPregunta,
            labels: labels
          });
          labelsData.push({
            numeroPregunta: questions[i].numeroPregunta,
            data: element.respuestas
          });
        }
      }
    }
    console.log("labelsArray: ", labelsArray);
    console.log("labelsData: ", labelsData);
    let arrayOfCountedData = [];
    for (let i = 0; i < labelsArray.length; i++) {
      const label = labelsArray[i];
      const data = labelsData[i];
      
      let arrayOfCounted = [];
      for (let j = 0; j < label.labels.length; j++) {
        const labelToCompare = label.labels[j];
        let counter = 0;
        
        for (let k = 0; k < data.data.length; k++) {
          const dataToCompare = data.data[k];

          if(typeof data.data[k] == typeof []) {
            for (let l = 0; l < data.data[k].length; l++) {
              const element = data.data[k][l];
              if(labelToCompare === data.data[k][l]) {
                counter++;
              }
            }
          }
          if(labelToCompare === dataToCompare) {
            counter++;
          }
        }
        arrayOfCounted.push(counter);
      }
      arrayOfCountedData.push(arrayOfCounted);
    }
    // console.log("arrayOfCountedData: ", arrayOfCountedData);
    this.countedData = [...arrayOfCountedData];
    // console.log("this.charts: ", this.charts);
    // console.log("this.countedData: ", this.countedData);
    setTimeout(() => {
      this.setShowChart();
    }, 150);
  }


}
