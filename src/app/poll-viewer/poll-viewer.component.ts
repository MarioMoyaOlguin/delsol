import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-poll-viewer',
  templateUrl: './poll-viewer.component.html',
  styleUrls: ['./poll-viewer.component.scss']
})
export class PollViewerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getOptionalQuestionsArray();
    this.getOrdenNormalArray();
  }

  @Input() dataArray?:any[] = [];
  @Output() newItemEvent = new EventEmitter<string>();

  // @Input() arrayPruebas?:any[] = [];

  optionalQuestionsArray:any = [];
  ordenNormalArray:any = [];
  
  getOptionalQuestionsArray = () => { //crear array de preguntas opcionales
    for (let i = 0; i < this.dataArray!.length; i++) {
      if(this.dataArray![i].opcional) {
        this.optionalQuestionsArray.push(this.dataArray![i])
      }
    }
  }
  getOrdenNormalArray = () => { //crear array de preguntas opcionales
    for (let i = 0; i < this.dataArray!.length; i++) {
      if(!this.dataArray![i].opcional) {
        this.ordenNormalArray.push(this.dataArray![i])
      }
    }
  }

  arregloPruebas = [
    {
      type: 'texto',
      question: 'pregunta tipo texto',
      required: true,
      done: true,
      numeroPregunta: 1,
      opcional: false,
      ramificar: 'no'
    },
    {
      type: 'calificacion',
      question: 'Pregunta tipo calificación',
      low: 'bg',
      high: 'gg',
      required: true,
      done: true,
      numeroPregunta: 2,
      opcional: false,
      ramificar: '4'
    },
    {
      type: 'opcion',
      number: 'no',
      question: 'Pregunta opción múltiple',
      optionsArray: ['op1', 'op2'],
      done: true,
      required: true,
      tipoLimite: 'no',
      numeroPregunta: 3,
      opcional: false,
      ramificar: 'no',
    },
    {
      type: 'estrellas',
      question: 'Pregunta calificar con estrellas',
      bad: 'bg',
      neutral: 'meh',
      good: 'gg',
      required: true,
      done: true,
      numeroPregunta: 4,
      opcional: false,
      ramificar: 'no'
    },
    {
      type: 'nps',
      question: 'Pregunta NPS',
      bad: 'bg',
      neutral: 'meh',
      good: 'gg',
      required: true,
      done: true,
      numeroPregunta: 5,
      opcional: false,
      ramificar: 'no'
    },
    {
      type: 'fecha',
      question: 'Selecciona una fecha',
      required: true,
      done: true,
      numeroPregunta: 6,
      opcional: false,
      ramificar: 'no'
    },
    {
      type: 'texto',
      question: 'pregunta tipo texto',
      required: true,
      done: true,
      numeroPregunta: 7,
      opcional: true,
      ramificar: 'no'
    },
    {
      type: 'calificacion',
      question: 'Pregunta tipo calificación',
      low: 'bg',
      high: 'gg',
      required: true,
      done: true,
      numeroPregunta: 8,
      opcional: true,
      ramificar: '4'
    },
    {
      type: 'opcion',
      number: 'no',
      question: 'Pregunta opción múltiple',
      optionsArray: ['op1', 'op2'],
      done: true,
      required: true,
      tipoLimite: 'no',
      numeroPregunta: 9,
      opcional: true,
      ramificar: 'no',
    }
  ]


}
