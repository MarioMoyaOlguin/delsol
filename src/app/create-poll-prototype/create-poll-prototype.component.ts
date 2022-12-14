import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-create-poll-prototype',
  templateUrl: './create-poll-prototype.component.html',
  styleUrls: ['./create-poll-prototype.component.scss']
})
export class CreatePollPrototypeComponent implements OnInit {
  
  @ViewChild('seccionPreguntas') divPreguntas!: ElementRef;
  
  constructor() { }

  ngOnInit(): void {
    // this.createQuestion('question');
  }

  
  /* -------------------------------- Variables ------------------------------- */
  i=1; //contador

  check = false; //control para pregunta obligatoria
  visible = true; // control para mostrar/esconder elementos
  disable = false // control para habilitar/desabilitar elementos
  editing = false // controla el modo de edición de pregunta

  right = {'justify-content': 'end', 'background-color': 'rgb(76, 197, 76)', 'border-color': 'rgb(76, 197, 76)'};
  left = {'justify-content': 'start', 'background-color': 'white', 'border-color': 'rgb(105, 105, 105)'};

  disabled = {'pointer-events': 'none', 'cursor': 'not-allowed'};
  enabled = {'pointer-events': 'auto', 'cursor': 'pointer'};

  show = {'opacity': '0', 'height': '0px', 'margin-top': '0px', 'pointer-events': 'none'};
  hide = {'opacity': '1', 'height': '40px', 'margin-top': '24px', 'pointer-events': 'auto'};

  displayNone = {'display': 'none'};
  displayBlock = {'display': 'block'};

  edit = {'border-top': '4px solid #f87171', 'background-color': '#fef2f2'};
  completed = {'border-top': '4px solid #64748b', 'background-color': '#f8fafc'};
  
  @Input() questionsArray:any[] = []; //Array de preguntas
  @Input() optionsArray:any[] = [] //Array de opciones, pregunta tipo opcion
  
  /* -------------------------------- Funciones ------------------------------- */
  addQuestion() { //establecer visibilidad de elementos
    this.visible = !this.visible;
  }
  
  //para editar preguntas
  prototypeQuestion(questionType:string) {
    const question = document.getElementById('newQ');
    this.disable = true;
    this.editing = true;

    switch (questionType) {
      case 'texto':
        this.questionsArray.push({type: 'texto', question: `Pregunta ${this.i}`, questionNumber: `Pregunta ${this.i}`, done: false});
        break;
      case 'calificacion':
        this.questionsArray.push({type: 'calificacion', questionNumber: `Pregunta ${this.i}`, question: `Pregunta ${this.i}`,
          low: ' ', high: ' ', done: false});
        break;
      case 'opcion':
        this.questionsArray.push({type: 'opcion', questionNumber: `Pregunta ${this.i}`, question: `Pregunta ${this.i}`, done: false,
        optionsArray: []});
        break;
    }
  }

  // Registrar tipo de pregunta al arreglo
  createQuestion(e:Event, type:string, data?:Array<String>) {
    e.preventDefault();
    this.questionsArray.pop();

    switch (type) {
      case 'texto':
        this.questionsArray.push({type: 'texto', question: data![0], questionNumber: `Pregunta ${this.i}`, answer: `Respuesta`,
        required: this.check, done: true});
        this.check = false;
        console.log(this.questionsArray);
        break;
      case 'calificacion':
        this.questionsArray.push({type: 'calificacion', question: data![0], questionNumber: `Pregunta ${this.i}`, low: data![1],
          high: data![2], done: true});
        console.log(this.questionsArray);
        break;
      case 'opcion':
        this.questionsArray.push({type: 'opcion', question: data![0], optionsArray: this.optionsArray, done: true});
        this.optionsArray = [];
        console.log(this.questionsArray);
        break;
    }
    this.editing = false;
    this.disable = false;
    this.i++;
  }
  removeQuestion = (e:Event) => {
    e.preventDefault();
  }

  setRequired = () => {
    this.check = !this.check;
  }

  setOption = (data:string) => {
    this.optionsArray.push(data);
    console.log(this.optionsArray)
  }
}
