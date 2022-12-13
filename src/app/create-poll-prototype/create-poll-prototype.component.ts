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

  visible = true; // control para mostrar/esconder elementos
  disable = false // control para habilitar/desabilitar elementos
  editing = false // controla el modo de edición de pregunta

  disabled = {'pointer-events': 'none', 'cursor': 'not-allowed'};
  enabled = {'pointer-events': 'auto', 'cursor': 'pointer'};

  show = {'opacity': '0', 'height': '0px', 'margin-top': '0px'};
  hide = {'opacity': '1', 'height': '40px', 'margin-top': '24px'};

  edit = {'background-color': '#fef2f2'};
  completed = {'background-color': '#f8fafc'};

  low = '';
  high = '';
  
  @Input() questionsArray:any[] = [];
  
  
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
        this.questionsArray.push({type: 'texto', question: `Pregunta ${this.i}`, questionNumber: `Pregunta ${this.i}`, done: false
        });
        break;
      case 'calificacion':
        this.questionsArray.push({type: 'calificacion', question: `Pregunta ${this.i}`, low: this.low, high: this.high, done: false});
        break;
    
      default:
        break;
    }
  }

  // Registrar tipo de pregunta al arreglo
  createQuestion(e:Event, type:string, data?:Array<String>) {
    e.preventDefault();
    this.questionsArray.pop();

    switch (type) {
      case 'texto':
        console.log(data);
        this.questionsArray.push({type: 'texto', question: data![0], questionNumber: `Pregunta ${this.i}`, answer: `Respuesta`, done: true});
        console.log(this.questionsArray);
        break;
      case 'calificacion':
        console.log(data);
        return;

        this.questionsArray.push({type: 'calificacion'});
        console.log(this.questionsArray);
        break;
    
      default:
        break;
    }
    this.editing = false;
    this.disable = false;
    this.i++;
  }


  setLow = (e:Event) => {
    console.log(e);
  }

  setHight = (e:Event) => {
    console.log(e);
  }

}
