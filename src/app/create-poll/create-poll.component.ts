import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

moment.locale('es');

import { fade } from 'src/app/animations';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.scss'],
  animations: [
    fade
  ],
})

export class CreatePollComponent implements OnInit {
  
  constructor() { }
  
  ngOnInit(): void {
    this.getDaysFromDate('01', '2023');
    this.pushYears();
  }
  
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  alert = false; //control para el switch de alerta para pregunta
  check = false; //control para el switch de pregunta obligatoria
  visible = true; // control para mostrar/esconder elementos
  disable = false; // control para habilitar/desabilitar elementos
  editing = false; // controla el modo de edición de pregunta
  editTitle = false; // Control de título de encuesta
  optional = false; // Para indicar que la pregunta es opcional
  viewer = false; //Controla el visor de preguntas
  route = false;

  titulo:[string] = ['Encuesta prueba']; // Título de encuesta
  questionsArray:any[] = []; //Array de preguntas
  optionsArray:any[] = []; //Array de opciones, pregunta tipo opcion
  optionalQuestionsArray:any[] = [];
  ordenNormalArray:any[] = [];
  doneQuestions:any[] = [];

  scoreArray = ['2','3','4','5','6','7','8','9'];
  starsArray = ['2','3','4'];

  condicionalOpciones = ''
  cantidadCondicionalOpciones = 0;

  /* -------------------------------------------------------------------------- */
  /*                              Estilos dinámicos                             */
  /* -------------------------------------------------------------------------- */
  right = {'background-color': 'rgb(76, 197, 76)', 'border-color': 'rgb(76, 197, 76)'};
  left = {'background-color': 'white', 'border-color': 'rgb(105, 105, 105)'};

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
  editPollTitle = () => { //editar titulo de la encuesta
    this.editTitle = true;
  }
  setPollTitle = (title:string) => { //establecer titulo de la encuesta
    if(title == '') { return; }
    this.titulo.pop();
    this.titulo.push(title)
    this.editTitle = false
  }

  openViewer = () => this.viewer = !this.viewer;
  routeViewer = () => this.route = !this.route;

  makeOptional = () => { //control pregunta opcional
    this.optional = !this.optional;
  }

  getOptionalQuestionsArray = () => { //crear array de preguntas opcionales
    this.optionalQuestionsArray = [];
    for (let i = 0; i < this.questionsArray.length; i++) {
      if(this.questionsArray[i].opcional) {
        this.optionalQuestionsArray.push(this.questionsArray[i])
      }
    }
  }
  getOrdenNormalArray = () => { //crear array de preguntas opcionales
    this.ordenNormalArray = [];
    for (let i = 0; i < this.questionsArray.length; i++) {
      if(!this.questionsArray[i].opcional) {
        this.ordenNormalArray.push(this.questionsArray[i])
      }
    }
  }
  getDoneQuestions = () => {
    this.doneQuestions = [];
    for (let i = 0; i < this.questionsArray.length; i++) {
      if(this.questionsArray[i].done) {
        this.doneQuestions.push(this.questionsArray[i])
      }
    }
  }

  addQuestion() { //Muestra o esconde los botones de selección de tipo de pregunta
    this.visible = !this.visible;
  }
  
  /* ---------------------- Entrar al editor de pregunta ---------------------- */
  prototypeQuestion(questionType:string) {
    this.disable = true;
    this.editing = true;

    this.getOptionalQuestionsArray();
    this.getOrdenNormalArray();

    switch (questionType) {
      case 'texto':
        this.questionsArray.push({type: 'texto', question: `Pregunta`, done: false});
        break;
      case 'calificacion':
        this.questionsArray.push({type: 'calificacion', question: `Pregunta`, low: ' ', high: ' ', done: false});
        break;
      case 'opcion':
        this.questionsArray.push({type: 'opcion', question: `Pregunta`, done: false, optionsArray: []});
        break;
      case 'estrellas':
        this.questionsArray.push({type: 'estrellas', question: `Pregunta`, bad: '', neutral: '', good: '', done: false});
        break;
      case 'nps':
        this.questionsArray.push({type: 'nps', question: `Pregunta`, done: false});
        break;
      case 'fecha':
        this.questionsArray.push({type: 'fecha', question: `Pregunta`, done: false});
        break;
    }
  }

  /* ------------------ Registrar tipo de pregunta al arreglo ----------------- */
  createQuestion(qType:string, index:number, data?:Array<string>) {
    console.log("data: ", data);

    // Validaciones
    if(qType === 'opcion' && this.optionsArray.length < 2 || qType === 'opcion' && data![0] === '') {
      alert('Rellena todos los campos');
      return;
    }
    if(data![0] === '') {
      alert('Rellena todos los campos');
      return;
    }

    switch (qType) {
      case 'texto':
        this.questionsArray.splice(index, 1, ({type: 'texto', question: data![0], required: this.check, done: true, numeroPregunta: index+1,
          opcional: this.optional, targetQuestion: data![1]}));
        break;

      case 'calificacion':
        if(data![3] !== 'no' && data![4] === 'no'){
          alert('Seleccione hacia que pregunta se ramifica');
          return;
        }
        if(data![4] !== 'no' && data![3] === 'no'){
          alert('Seleccione condicion para ramificar pregunta');
          return;
        }
        this.questionsArray.splice(index, 1, ({type: 'calificacion', question: data![0], low: data![1],
          high: data![2], required: this.check, done: true, numeroPregunta: index+1, opcional: this.optional, ramificar: data![3],
            targetQuestion: data![4]}));
        break;

      case 'opcion':
        const number = data![2] === '' ? 0 : parseInt(data![2]);
        if(this.optionsArray.length <= number) {
          alert('La cantidad de opciones no puede ser menor o igual a la cantidad de control');
          return;
        }
        if(data![1] !== 'no' && data![2] === '') {
          alert('Seleccione cantidad para limitar las opciones');
          return;
        }
        if(data![3] !== 'no' && data![4] === 'no'){
          alert('Seleccione hacia que pregunta se ramifica');
          return;
        }
        if(data![4] !== 'no' && data![3] === 'no'){
          alert('Seleccione condicion para ramificar pregunta');
          return;
        }
        this.questionsArray.splice(index, 1, ({type: 'opcion', question: data![0],  optionsArray: this.optionsArray, done: true, required: this.check,
          tipoLimite: data![1], numero: number, numeroPregunta: index+1, opcional: this.optional, ramificar: data![3], targetQuestion: data![4] }));
        break;

      case 'estrellas':
        if(data![4] !== 'no' && data![5] === 'no'){
          alert('Seleccione hacia que pregunta se ramifica');
          return;
        }
        if(data![5] !== 'no' && data![4] === 'no'){
          alert('Seleccione condicion para ramificar pregunta');
          return;
        }
        this.questionsArray.splice(index, 1, ({type: 'estrellas', question: data![0], bad: data![1], neutral: data![2], good: data![3], 
          required: this.check, done: true, numeroPregunta: index+1, opcional: this.optional, ramificar: data![4], targetQuestion: data![5] }));
        break;

      case 'nps':
        if(data![4] !== 'no' && data![5] === 'no'){
          alert('Seleccione hacia que pregunta se ramifica');
          return;
        }
        if(data![5] !== 'no' && data![4] === 'no'){
          alert('Seleccione condicion para ramificar pregunta');
          return;
        }
        this.questionsArray.splice(index, 1, ({type: 'nps', question: data![0], bad: data![1], neutral: data![2], good: data![3], 
          required: this.check, done: true, numeroPregunta: index+1, opcional: this.optional, ramificar: data![4], targetQuestion: data![5] }));
        break;

      case 'fecha':
        this.questionsArray.splice(index, 1, ({type: 'fecha', question: data![0], required: this.check, done: true, numeroPregunta: index+1,
          opcional: this.optional, targetQuestion: data![1] }));
        break;
    }

    // console.log("array opcionales: ", this.optionalQuestionsArray);
    console.log("questionsArray: ", this.questionsArray);

    //Reiniciar controles
    this.alert = false;
    this.check = false;
    this.editing = false;
    this.disable = false;
    this.optional = false;
    this.optionsArray = [];

  }

  /* ---------------------- Elimina pregunta del arreglo ---------------------- */
  removeQuestion = (e:Event, index:number) => {
    this.questionsArray.splice(index, 1)
    this.disable = false;
    this.optionsArray = [];
    this.check = false;
    this.editing = false;
    this.getOptionalQuestionsArray();
    this.getOrdenNormalArray();
  }

  /* ----------------------------- Editar pregunta ---------------------------- */
  editQuestion = (type:string, index:number) => {
    this.disable = true;
    this.editing = true;

    switch (type) {
      case 'texto':
        this.questionsArray.splice(index, 1, ({type: 'texto', question: `Pregunta`, done: false}));
        break;
      case 'calificacion':
        this.questionsArray.splice(index, 1, ({type: 'calificacion', question: `Pregunta`, low: ' ', high: ' ', done: false}));
        break;
      case 'opcion':
        this.questionsArray.splice(index, 1, ({type: 'opcion', question: `Pregunta`, done: false, optionsArray: []}));
        break;
      case 'estrellas':
        this.questionsArray.splice(index, 1, ({type: 'estrellas', question: `Pregunta`, bad: '', neutral: '', good: '', done: false}));
        break;
      case 'nps':
        this.questionsArray.splice(index, 1, ({type: 'nps', question: `Pregunta`, done: false}));
        break;
    }
    this.getOptionalQuestionsArray();
    this.getOrdenNormalArray();
  }

  /* --------------------------------- Move up -------------------------------- */
  moveUp = (index:number) => {
    const item = this.questionsArray[index]
    this.questionsArray.splice(index, 1);
    this.questionsArray.splice(index -1, 0, item);
    this.getOptionalQuestionsArray();
    this.getOrdenNormalArray();
  }

  /* -------------------------------- Move down ------------------------------- */
  moveDown = (index:number) => {
    const item = this.questionsArray[index]
    this.questionsArray.splice(index, 1);
    this.questionsArray.splice(index +1, 0, item);
    this.getOptionalQuestionsArray();
    this.getOrdenNormalArray();
  }

  /* --------------------- Switch de pregunta obligatoria --------------------- */
  setRequired = () => {
    this.check = !this.check;
  }
  /* ------------------------------ Switch alerta ----------------------------- */
  setAlert = () => {
    this.alert = !this.alert;
  }

  /* ------- Guardar opcion al arreglo de opciones y validar que no se guarde texto vacio al arreglo de opciones ------ */
  setOption = (data:string) => {
    if(data === '') return;
    this.optionsArray.push(data);
  }
  /* ------------- Referencia a checkboxes y aplicar limitaciones ------------- */
  controlCheckboxes = (ref:any, tipo:string, cantidad:number) => {
    // console.log("hijos: ", ref.children.length);
    // console.log("referencia del check: ", ref.children);
    let checkedCount = 0;
    
    for (let i = 0; i < ref.children.length; i++) {
      if(ref.children[i].children[0].children[0].checked === true) { checkedCount++}
      // console.log(`hijo ${i+1}:`, ref.children[i].children[0].children[0].checked);
    }

    switch (tipo) {
      case 'minimo':
        
        break;
      case 'maximo' || 'fija':
        if(checkedCount === cantidad) {
          for (let i = 0; i < ref.children.length; i++) {
            if(ref.children[i].children[0].children[0].checked === false) {
              ref.children[i].children[0].children[0].disabled = true;
            }
          }
        } else {
          for (let i = 0; i < ref.children.length; i++) {
            ref.children[i].children[0].children[0].disabled = false;
          }
        }
        break;
    }

  }
  setCondicionalOpciones = (condicional:string) => {
    this.condicionalOpciones = condicional
  }
  setCantidadCondicionalOpciones = (cantidad:string) => {
    const numero = parseInt(cantidad);
    this.cantidadCondicionalOpciones = numero;
  }

  /* ----------------- Elimina opción del arreglo de opciones ----------------- */
  removeOption = (index:number) => {
    this.optionsArray.splice(index, 1);
  }

  /* -------------------------------------------------------------------------- */
  /* ------------------------------- Calendario ------------------------------- */
  /* -------------------------------------------------------------------------- */
  semana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  yearsArray:string[] = [];
  dateSelect:any;
  monthSelect:any;

  pushYears = () => {
    for (let i = 2022; i > 1900; i--) {
      this.yearsArray.push(i.toString())
    }
  }

  getDate = (month:string, year:string) => {
    this.getDaysFromDate(month, year);
  }

  getDaysFromDate = (month:string, year:string) => {
    const startDate = moment(`${year}/${month}/01`).locale('es');
    const endDate = startDate.clone().endOf('month');
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true);
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map( (a:any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday(),
        active: false
      }
    });
    this.monthSelect = arrayDays;
  }

  changeMonth = (flag:number) => {
    if(flag < 0) {
      const nextDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  clickDay = (day:any) => {
    for (let i = 0; i < this.monthSelect.length; i++) {
      if(this.monthSelect[i].name === day.name && this.monthSelect[i].value === day.value) {
        this.monthSelect[i].active = true;
      } else {
        this.monthSelect[i].active = false;
      }
    }
    const monthYear = this.dateSelect.format('MM-YYYY');
    const parse = `${day.value}-${monthYear}`;
  }




}
