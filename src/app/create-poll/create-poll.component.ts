import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

moment.locale('es');

import { fade, fadeOut } from 'src/app/animations';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.scss'],
  animations: [
    fade,
    fadeOut
  ],
})

export class CreatePollComponent implements OnInit {
  
  constructor() { }
  
  ngOnInit(): void {
    this.getDaysFromDate('01', '2023');
    this.pushYears();
  }

  mockQuestions = [
    {alert: true, alertTrigger: 'Ropa', done: true, numero: 2, numeroPregunta: 1, opcional: false, optionsArray: [{opcion: 'Ropa', ramificar: true, targetQ: '1'}, {opcion: 'Electrónica', ramificar: true, targetQ: '3'}, {opcion: 'Juguetería', ramificar: false, targetQ: 'no'}, {opcion: 'abarrotes', ramificar: false, targetQ: 'no'}, {opcion: 'merceria', ramificar: false, targetQ: 'no'}, {opcion: 'carnes', ramificar: false, targetQ: 'no'}], required: true, tipoLimite: 'minimo', targetQuestion: 'no', type: 'opcion', question: '¿Que departamentos visitó?'},
    {done: true, numeroPregunta: 2, opcional: false, required: false, targetQuestion: 'no', type: 'texto', question: '¿Que podemos hacer para mejorar el servicio?'},
    {alert: true, alertTrigger: '2', done: true, high:'Excelente', low: 'Pesima', numeroPregunta: 3, opcional: false, ramificar: '2', ramificar2: '10', required: false, target2: '6', targetQuestion: '1', type: 'calificacion', question: '¿Cómo fue su experiencia de compra?'},
    {alert: false, alertTrigger: 'no', bad: 'Pesimas', done: true, good: 'Excelentes', neutral: 'Neutral', numeroPregunta: 4, opcional: false, ramificar: 'no', ramificar2: 'no', required: false, target2: 'no', targetQuestion: 'no', type: 'estrellas', question: '¿Como califica las instalaciones?'},
    {alert: false, alertTrigger: 'no', bad: 'Malo', done: true, good: 'Excelente', neutral: 'Neutral', numeroPregunta: 5, opcional: false, ramificar: 'no', ramificar2: 'no', required: false, target2: 'no', targetQuestion: 'no', type: 'nps', question: '¿Como calificaria el trato al cliente?'},
    {done: true, numeroPregunta: 6, opcional: false, required: false, targetQuestion: 'no', type: 'fecha', question: '¿Cuál es su fecha de cumpleaños?'},
  ]
  
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
  route = false; //Mostrar simulador
  branchOptions = false; // Mostrar/ocultar mas opciones de ramificacion
  multibranch = false; //Determinar si hay mas de 1 opcion que ramifica en pregunta tipo opcion
  dialog = false; //para controlar la caja de dialogo

  titulo:[string] = ['Encuesta prueba']; // Título de encuesta
  questionsArray:any[] = [...this.mockQuestions]; //Array principal de preguntas
  optionsArray:any[] = []; //Array de opciones, pregunta tipo opcion
  doneQuestions:any[] = [];

  scoreArray = ['2','3','4','5','6','7','8','9'];
  starsArray = ['2','3','4'];

  condicionalOpciones = ''
  cantidadCondicionalOpciones = 0;
  message = "";

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
  
  /* -------------------------------------------------------------------------- */
  /*                                  Funciones                                 */
  /* -------------------------------------------------------------------------- */

  /* --------------------------- ventana de dialogo --------------------------- */
  handleDialog = () => this.dialog = !this.dialog;

  /* ------------------------------- drag & drop ------------------------------ */
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questionsArray, event.previousIndex, event.currentIndex);
    this.updateQuestionNumber();
    console.log(this.questionsArray);
  }

  /* ---------------------- editar titulo de la encuesta ---------------------- */
  editPollTitle = () => { this.editTitle = true; }

  /* --------------------- Desplegar/replegar la pregunta --------------------- */
  retract = (body:any, header:any, questionContainer:any) => {
    if(body.classList.contains('h-0')) { //Desplegar
      body.classList.remove('h-0')
      header.classList.remove('rounded-pill')
      header.classList.remove('shadow-question')
      header.children[0].children[0].classList.add('rotate-90')
      header.children[0].children[2].classList.add('opacity-0')
      questionContainer.classList.add('shadow-question')
    } else { //Replegar
      body.classList.add('h-0')
      header.classList.add('rounded-pill')
      header.classList.add('shadow-question')
      header.children[0].children[0].classList.remove('rotate-90')
      header.children[0].children[2].classList.remove('opacity-0')
      questionContainer.classList.remove('shadow-question')
    }
  }

  /* -------------------- establecer titulo de la encuesta -------------------- */
  setPollTitle = (title:string) => {
    if(title == '') { return; }
    this.titulo.pop();
    this.titulo.push(title);
    this.editTitle = false;
  }

  openViewer = () => this.viewer = !this.viewer;
  routeViewer = () => this.route = !this.route;
  setBranchOptions = () => this.branchOptions = !this.branchOptions;
  makeOptional = () => this.optional = !this.optional;

  getDoneQuestions = () => {
    this.doneQuestions = [];
    for (let i = 0; i < this.questionsArray.length; i++) {
      if(this.questionsArray[i].done) {
        this.doneQuestions.push(this.questionsArray[i])
      }
    }
  }

  //Muestra o esconde los botones de selección de tipo de pregunta
  addQuestion() { this.visible = !this.visible; }
  
  /* ---------------------- Entrar al editor de pregunta ---------------------- */
  prototypeQuestion(questionType:string) {
    this.disable = true;
    this.editing = true;

    switch (questionType) {
      case 'texto':
        this.questionsArray.push({type: 'texto', question: ``, done: false});
        break;
      case 'calificacion':
        this.questionsArray.push({type: 'calificacion', question: ``, low: '', high: '', done: false});
        break;
      case 'opcion':
        this.questionsArray.push({type: 'opcion', question: ``, done: false, optionsArray: []});
        break;
      case 'estrellas':
        this.questionsArray.push({type: 'estrellas', question: ``, bad: '', neutral: '', good: '', done: false});
        break;
      case 'nps':
        this.questionsArray.push({type: 'nps', question: ``, done: false});
        break;
      case 'fecha':
        this.questionsArray.push({type: 'fecha', question: ``, done: false});
        break;
    }
  }

  /* ------------------ Registrar tipo de pregunta al arreglo ----------------- */
  createQuestion(qType:string, index:number, data?:Array<any>) {
    console.log("data: ", data);

    // Validaciones
    if(qType === 'opcion' && this.optionsArray.length < 2 || qType === 'opcion' && data![0] === '') {
      this.message = 'Por favor rellene todos los campos';
      this.handleDialog();
      return;
    }
    if(data![0] === '' || data![1] === '' || qType !== 'opcion' && data![2] === '' || data![3] === '' || data![4] === '' || data![5] === '') {
      this.message = 'Por favor rellene todos los campos';
      this.handleDialog();
      return;
    }

    switch (qType) {
      case 'texto':
        this.questionsArray.splice(index, 1, ({type: 'texto', question: data![0], required: this.check, done: true, numeroPregunta: index+1,
          opcional: this.optional, targetQuestion: data![1]}));
        break;

      case 'calificacion':
        if(data![3] !== 'no' && data![4] === 'no'){
          this.message = 'Seleccione hacia que pregunta se ramifica';
          this.handleDialog();
          return;
        }
        if(data![4] !== 'no' && data![3] === 'no'){
          this.message = 'Seleccione una condicion para ramificar la pregunta';
          this.handleDialog();
          return;
        }
        if(this.alert && data![7] === 'no') {
          this.message = 'Seleccione una condicion para activar la alerta';
          this.handleDialog();
          return;
        }
        if(!this.alert && data![7] !== 'no') {
          this.alert = true;
        }
        if(data![3] !== 'no' && parseInt(data![5]) <= parseInt(data![3])){
          this.message = 'La condición para multiples rutas no puede estar en el mismo rango';
          this.handleDialog();
          return;
        }
        this.questionsArray.splice(index, 1, ({type: 'calificacion', question: data![0], low: data![1],
          high: data![2], required: this.check, done: true, numeroPregunta: index+1, opcional: this.optional, ramificar: data![3],
            targetQuestion: data![4], ramificar2: data![5], target2: data![6], alert: this.alert, alertTrigger: data![7]}));
        break;

      case 'opcion': 
        const number = data![2] === '' ? 0 : parseInt(data![2]);
        if(this.optionsArray.length < number) {
          this.message = 'La cantidad de control no puede ser mayor a la cantidad de opciones';
          this.handleDialog();
          return;
        }
        if(data![1] !== 'no' && data![2] === '') {
          this.message = 'Seleccione cantidad para limitar las opciones';
          this.handleDialog();
          return;
        }
        if(this.alert && data![3] === 'no') {
          this.message = 'Seleccione una condicion para activar la alerta';
          this.handleDialog();
          return;
        }
        if(!this.alert && data![3] !== 'no') {
          this.alert = true;
        }
        for (let i = 0; i < data![4].children.length; i++) { //validar las opciones de ramificacion del arreglo de opciones
          let branchChecked = data![4].children[i].children[1].children[0].children[0].checked;
          const targetQuestion = data![4].children[i].children[1].children[1].children[1].value;
          if(branchChecked && targetQuestion === 'no') {
            this.message = `Seleccione hacia que pregunta se ramifica la opción ${i+1}`;
            this.handleDialog();
            return;
          }
          if(!branchChecked && targetQuestion !== 'no') {
            branchChecked = true;
          }
        }
        // for del arreglo de opciones para registrar objetos al optionsArray con datos de las opciones
        this.optionsArray = [];
        for (let i = 0; i < data![4].children.length; i++) {
          let branchChecked = data![4].children[i].children[1].children[0].children[0].checked;
          const targetQuestion = data![4].children[i].children[1].children[1].children[1].value;
          if(branchChecked && targetQuestion === 'no') {
            this.message = `Seleccione hacia que pregunta se ramifica la opción ${i+1}`;
            this.handleDialog();
            return;
          }
          if(!branchChecked && targetQuestion !== 'no') {
            branchChecked = true;
          }
          this.optionsArray.push({
            opcion: data![4].children[i].children[0].innerText,
            ramificar: branchChecked,
            targetQ: targetQuestion
          })
        }
        this.questionsArray.splice(index, 1, ({type: 'opcion', question: data![0],  optionsArray: this.optionsArray, done: true, required: this.check,
          tipoLimite: data![1], numero: number, numeroPregunta: index+1, opcional: this.optional, alert: this.alert, alertTrigger: data![3],
          multibranch: this.multibranch}) );
        break;

      case 'estrellas':
        if(data![4] !== 'no' && data![5] === 'no'){
          this.message = 'Seleccione hacia que pregunta se ramifica';
          this.handleDialog();
          return;
        }
        if(data![5] !== 'no' && data![4] === 'no'){
          this.message = 'Seleccione condicion para ramificar pregunta';
          this.handleDialog();
          return;
        }
        if(this.alert && data![8] === 'no') {
          this.message = 'Seleccione una condicion para activar la alerta';
          this.handleDialog();
          return;
        }
        if(!this.alert && data![8] !== 'no') {
          this.alert = true;
        }
        if(data![4] !== 'no' && parseInt(data![6]) <= parseInt(data![4])){
          this.message = 'La condición para multiples rutas no puede estar en el mismo rango';
          this.handleDialog();
          return;
        }
        this.questionsArray.splice(index, 1, ({type: 'estrellas', question: data![0], bad: data![1], neutral: data![2], good: data![3], 
          required: this.check, done: true, numeroPregunta: index+1, opcional: this.optional, ramificar: data![4], targetQuestion: data![5],
          ramificar2: data![6], target2: data![7], alert: this.alert, alertTrigger: data![8]}));
        break;

      case 'nps':
        if(data![4] !== 'no' && data![5] === 'no'){
          this.message = 'Seleccione hacia que pregunta se ramifica';
          this.handleDialog();
          return;
        }
        if(data![5] !== 'no' && data![4] === 'no'){
          this.message = 'Seleccione condicion para ramificar pregunta';
          this.handleDialog();
          return;
        }
        if(this.alert && data![8] === 'no') {
          this.message = 'Seleccione una condicion para activar la alerta';
          this.handleDialog();
          return;
        }
        if(!this.alert && data![8] !== 'no') {
          this.alert = true;
        }
        if(data![4] !== 'no' && parseInt(data![6]) <= parseInt(data![4])){
          this.message = 'La condición para multiples rutas no puede estar en el mismo rango';
          this.handleDialog();
          return;
        }
        this.questionsArray.splice(index, 1, ({type: 'nps', question: data![0], bad: data![1], neutral: data![2], good: data![3], 
          required: this.check, done: true, numeroPregunta: index+1, opcional: this.optional, ramificar: data![4], targetQuestion: data![5],
          ramificar2: data![6], target2: data![7], alert: this.alert, alertTrigger: data![8]}));
        break;

      case 'fecha':
        this.questionsArray.splice(index, 1, ({type: 'fecha', question: data![0], required: this.check, done: true, numeroPregunta: index+1,
          opcional: this.optional, targetQuestion: data![1]}));
        break;
    }

    console.log("questionsArray: ", this.questionsArray);
    //Reiniciar controles
    this.alert = false;
    this.check = false;
    this.editing = false;
    this.disable = false;
    this.optional = false;
    this.branchOptions = false;
    this.optionsArray = [];
    this.multibranch = false;
  }

  /* ---------------------- Elimina pregunta del arreglo ---------------------- */
  removeQuestion = (e:Event, index:number) => {
    this.questionsArray.splice(index, 1)
    this.alert = false;
    this.check = false;
    this.editing = false;
    this.disable = false;
    this.optional = false;
    this.branchOptions = false;
    this.optionsArray = [];
    this.multibranch = false;
  }

  /* ----------------------------- Editar pregunta ---------------------------- */
  editQuestion = (type:string, index:number) => {
    const targetQuestion = this.questionsArray[index];
    console.log("targetQuestion: ", targetQuestion);

    switch (type) {
      case 'texto':
        this.questionsArray.splice(index, 1, ({type: 'texto', question: targetQuestion.question, done: false}));
        break;
      case 'calificacion':
        this.questionsArray.splice(index, 1, ({type: 'calificacion', question: targetQuestion.question, low: targetQuestion.low,
          high: targetQuestion.high, done: false}));
        break;
      case 'opcion':
        this.optionsArray = targetQuestion.optionsArray;
        this.questionsArray.splice(index, 1, ({type: 'opcion', question: targetQuestion.question, optionsArray: targetQuestion.optionsArray, done: false}));
        break;
      case 'estrellas':
        this.questionsArray.splice(index, 1, ({type: 'estrellas', question: targetQuestion.question, bad: targetQuestion.bad,
          neutral: targetQuestion.neutral, good: targetQuestion.good, done: false}));
        break;
      case 'nps':
        this.questionsArray.splice(index, 1, ({type: 'nps', question: targetQuestion.question, bad: targetQuestion.bad,
          neutral: targetQuestion.neutral, good: targetQuestion.good, done: false}));
        break;
      case 'fecha':
        this.questionsArray.splice(index, 1, ({type: 'fecha', question: targetQuestion.question, done: false}));
        break;
    }
    this.disable = true;
    this.editing = true;
  }

  multibranchOptions = (ref:any) => {
    let checkedCounter = 0; //contador
    for (let i = 0; i < ref.children.length; i++) { //Referencia al contenedor de opciones
      if(ref.children[i].children[1].children[0].children[0].checked) { //si hay opcion con que ramifica
        checkedCounter++;
      }
    }
    if(checkedCounter >= 2) {
      this.multibranch = true;
    } else {
      this.multibranch = false;
    }
  }

  updateQuestionNumber = () => {
    for (let i = 0; i < this.questionsArray.length; i++) { this.questionsArray[i].numeroPregunta = i + 1 }
  }

  /* --------------------------------- Move up -------------------------------- */
  moveUp = (index:number) => {
    const item = this.questionsArray[index]
    this.questionsArray.splice(index, 1);
    this.questionsArray.splice(index -1, 0, item);
    this.updateQuestionNumber();
  }

  /* -------------------------------- Move down ------------------------------- */
  moveDown = (index:number) => {
    const item = this.questionsArray[index]
    this.questionsArray.splice(index, 1);
    this.questionsArray.splice(index +1, 0, item);
    this.updateQuestionNumber();
  }

  /* --------------------- Switch de pregunta obligatoria --------------------- */
  setRequired = () => { this.check = !this.check }

  /* ------------------------------ Switch alerta ----------------------------- */
  setAlert = () => { this.alert = !this.alert }

  /* ------- Guardar opcion al arreglo de opciones y validar que no se guarde texto vacio al arreglo de opciones ------ */
  setOption = (data:string) => {
    if(data === '') return;
    this.optionsArray.push({
      opcion: data,
      ramificar: false,
      targetQ: ''
    });
  }

  setCondicionalOpciones = (condicional:string) => { this.condicionalOpciones = condicional }

  setCantidadCondicionalOpciones = (cantidad:string) => {
    const numero = parseInt(cantidad);
    this.cantidadCondicionalOpciones = numero;
  }

  /* ----------------- Elimina opción del arreglo de opciones ----------------- */
  removeOption = (index:number) => { this.optionsArray.splice(index, 1) }

  log = (ref:any) => console.log(ref);

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

// @Component({
  
// })
