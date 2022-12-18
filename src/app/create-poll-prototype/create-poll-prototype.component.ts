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

  
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  check = false; //control para el switch de pregunta obligatoria
  visible = true; // control para mostrar/esconder elementos
  disable = false // control para habilitar/desabilitar elementos
  editing = false // controla el modo de edición de pregunta
  questionsArray:any[] = []; //Array de preguntas
  optionsArray:any[] = [] //Array de opciones, pregunta tipo opcion
  i = 1; //Contador

  /* -------------------------------------------------------------------------- */
  /*                              Estilos dinámicos                             */
  /* -------------------------------------------------------------------------- */
  right = {'justify-content': 'end', 'background-color': 'rgb(76, 197, 76)', 'border-color': 'rgb(76, 197, 76)'};
  left = {'justify-content': 'start', 'background-color': 'white', 'border-color': 'rgb(105, 105, 105)'};

  disabled = {'pointer-events': 'none', 'cursor': 'not-allowed'};
  enabled = {'pointer-events': 'auto', 'cursor': 'pointer'};

  show = {'opacity': '0', 'height': '0px', 'margin-top': '0px', 'pointer-events': 'none'};
  hide = {'opacity': '1', 'height': 'fit-content', 'margin-top': '24px', 'pointer-events': 'auto'};

  pointerEvs = {'pointer-events': 'auto'};
  noPointerEvs = {'pointer-events': 'none'}

  displayNone = {'display': 'none'};
  displayBlock = {'display': 'block'};

  edit = {'border-top': '5px solid #f87171', 'background-color': '#fef2f2'};
  completed = {'border-top': '5px solid #64748b', 'background-color': '#f8fafc'};
  
  /* -------------------------------------------------------------------------- */
  /*                                  Funciones                                 */
  /* -------------------------------------------------------------------------- */
  addQuestion() { //Muestra o esconde los botones de selección de tipo de pregunta
    this.visible = !this.visible;
  }
  
  /* ---------------------- Entrar al editor de pregunta ---------------------- */
  prototypeQuestion(questionType:string) {
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
      case 'estrellas':
        this.questionsArray.push({type: 'estrellas', questionNumber: `Pregunta ${this.i}`, question: `Pregunta ${this.i}`,
        bad: '', neutral: '', good: '', done: false});
        break;
      case 'nps':
        this.questionsArray.push({type: 'nps', questionNumber: `Pregunta ${this.i}`, question: `Pregunta ${this.i}`, done: false});
        break;
    }
    this.i++;
  }

  /* ------------------ Registrar tipo de pregunta al arreglo ----------------- */
  createQuestion(e:Event, qType:string, index:number, data?:Array<String>) {
    e.preventDefault();

    // Validaciones
    if(qType === 'opcion' && this.optionsArray.length < 2 || qType === 'opcion' && data![0] === '') {
      alert('Rellena todos los campos');
      return;
    }
    if(qType === 'texto' && data![0] === '') {
      alert('Escribe tu pregunta')
      return;
    }
    if(qType === 'calificacion' && data![0] === '' || data![1] === '' || data![2] === '' || data![3] === '') {
      alert('Rellena todos los campos');
      return;
    }

    this.questionsArray.pop();

    switch (qType) {
      case 'texto':
        this.questionsArray.push({type: 'texto', question: data![0], questionNumber: `Pregunta `+(index + 1), answer: `Respuesta`,
          required: this.check, done: true});
        console.log(this.questionsArray);
        break;
      case 'calificacion':
        this.questionsArray.push({type: 'calificacion', question: data![0], questionNumber: `Pregunta `+(index + 1), low: data![1],
          high: data![2], required: this.check, done: true});
        console.log(this.questionsArray);
        break;
        case 'opcion':
          this.questionsArray.push({type: 'opcion', question: data![0],  optionsArray: this.optionsArray, questionNumber: `Pregunta `+(index + 1),
            done: true, required: this.check});
          console.log(this.questionsArray);
          break;
        case 'estrellas':
          this.questionsArray.push({type: 'estrellas', question: data![0], bad: data![1], neutral: data![2], good: data![3],
            questionNumber: `Pregunta `+(index + 1), required: this.check, done: true});
          console.log(this.questionsArray);
          break;
        case 'nps':
          this.questionsArray.push({type: 'nps', question: data![0], bad: data![1], neutral: data![2], good: data![3],
            questionNumber: `Pregunta `+(index + 1), required: this.check, done: true});
          console.log(this.questionsArray);
          break;
    }
    this.check = false;
    this.editing = false;
    this.disable = false;
    this.optionsArray = [];
  }

  /* ---------------------- Elimina pregunta del arreglo ---------------------- */
  removeQuestion = (e:Event, index:number) => {
    e.preventDefault();
    this.questionsArray.splice(index, 1)
    this.disable = false;
    this.i--;
    this.optionsArray = [];
    this.check = false;
  }

  /* --------------------- Switch de pregunta obligatoria --------------------- */
  setRequired = () => {
    this.check = !this.check;
  }

  /* ------- Validar que no se guarde texto vacio al arreglo de opciones ------ */
  setOption = (data:string) => {
    if(data === '') return;
    this.optionsArray.push(data);
  }
}
