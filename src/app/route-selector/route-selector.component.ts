import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
moment.locale('es');

import { fade } from '../animations';

@Component({
  selector: 'app-route-selector',
  templateUrl: './route-selector.component.html',
  styleUrls: ['./route-selector.component.scss'],
  animations: [
    fade
  ],
})
export class RouteSelectorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getDaysFromDate('01', '2023');
    this.pushYears();
    this.fillScoreArray();
    this.fillStarsArray();
    this.fillNpsArray();
    this.getOpcionalOFlujoNormal();
    this.getCurrentQuestion();
    console.log(this.currentQuestion);
  }

  // dataArray = [
  //   {
  //     type: 'texto',
  //     question: 'pregunta 1 tipo texto',
  //     required: false,
  //     done: true,
  //     numeroPregunta: 1,
  //     opcional: false,
  //     targetQuestion: 'no',
  //     ramificar2: 'no',
  //     target2: 'no'
  //   },
  //   {
  //     type: 'calificacion',
  //     question: 'Pregunta 2 tipo calificación',
  //     required: true,
  //     done: true,
  //     numeroPregunta: 2,
  //     opcional: false,
  //     ramificar: '4',
  //     targetQuestion: '7',
  //     ramificar2: '9',
  //     target2: '8'
  //   },
  //   {
  //     type: 'opcion',
  //     numero: '2',
  //     question: 'Pregunta 3 opción múltiple',
  //     optionsArray: ['op1', 'op2', 'opcion3', 'op4'],
  //     done: true,
  //     required: true,
  //     tipoLimite: 'fija',
  //     numeroPregunta: 3,
  //     opcional: false,
  //     ramificar: 'op2',
  //     targetQuestion: '8',
  //     ramificar2: 'no',
  //     target2: 'no'
  //   },
  //   {
  //     type: 'estrellas',
  //     question: 'Pregunta 4 calificar con estrellas',
  //     bad: 'Mala',
  //     neutral: 'Neutral',
  //     good: 'Excelente',
  //     required: true,
  //     done: true,
  //     numeroPregunta: 4,
  //     opcional: false,
  //     ramificar: 'no',
  //     targetQuestion: 'no',
  //     ramificar2: 'no',
  //     target2: 'no'
  //   },
  //   {
  //     type: 'nps',
  //     question: 'Pregunta 5 NPS',
  //     bad: 'Mala',
  //     neutral: 'Neutral',
  //     good: 'Excelente',
  //     required: true,
  //     done: true,
  //     numeroPregunta: 5,
  //     opcional: false,
  //     ramificar: '1',
  //     targetQuestion: '8',
  //     ramificar2: 'no',
  //     target2: 'no'
  //   },
  //   {
  //     type: 'fecha',
  //     question: 'Selecciona una 6 fecha',
  //     required: true,
  //     done: true,
  //     numeroPregunta: 6,
  //     opcional: false,
  //     targetQuestion: 'no',
  //     ramificar2: 'no',
  //     target2: 'no'
  //   },
  //   {
  //     type: 'texto',
  //     question: 'pregunta 7 tipo texto',
  //     required: true,
  //     done: true,
  //     numeroPregunta: 7,
  //     opcional: true,
  //     targetQuestion: '3',
  //     ramificar2: 'no',
  //     target2: 'no'
  //   },
  //   {
  //     type: 'calificacion',
  //     question: 'Pregunta tipo 8 calificación',
  //     required: true,
  //     done: true,
  //     numeroPregunta: 8,
  //     opcional: true,
  //     ramificar: '4',
  //     targetQuestion: '9',
  //     ramificar2: 'no',
  //     target2: 'no'
  //   },
  //   {
  //     type: 'opcion',
  //     numero: 'no',
  //     question: 'Pregunta 9 opción múltiple',
  //     optionsArray: ['op1', 'op2', 'op3'],
  //     done: true,
  //     required: true,
  //     tipoLimite: 'no',
  //     numeroPregunta: 9,
  //     opcional: true,
  //     ramificar: 'no',
  //     targetQuestion: 'Finalizar Encuesta',
  //     ramificar2: 'no',
  //     target2: 'no'
  //   }
  // ]

  @Input() dataArray?:any[] = [];

  position = 0; //Posicion en el array de flujo normal
  optionsRef:any; //Referencia opcion multiple
  textAreaRef:any; //Referencia pregunta abierta

  currentQuestion:any = []; //Datos de la pregunta que se renderizan en pantalla

  scoreArray:any = []; //Para seleccionar una respuesta al hacer click
  starsArray:any = []; //Para seleccionar una respuesta al hacer click
  npsArray:any = []; //Para seleccionar una respuesta al hacer click

  currentData:any = []; //Array de respuestas de usuario antes de registrarse a responsesArray
  responsesArray:any = []; //Array principal que guarda las respuestas de usuario

  arrayFlujoNormal:any = [];
  arrayOpcionales:any = [];

  /* -------------------------------------------------------------------------- */
  /*                         Obtener siguiente pregunta                         */
  /* -------------------------------------------------------------------------- */
  getNextQuestion = (datos:any[]) => {
    // Validar que el campo no este vacio si es obligatorio
    if(this.currentData.length < 1 && this.currentQuestion.required) {
      alert('Por favor rellene los datos');
      return;
    }
    if(datos.length < 1) {
      datos = ['sin respuesta'];
    }
    // Validar si se ramifica la pregunta
    if(this.currentQuestion.ramificar && this.currentQuestion.ramificar !== 'no') {
      if(
        this.currentQuestion.type === 'calificacion' && parseInt(datos[0]) <= parseInt(this.currentQuestion.ramificar) ||
        this.currentQuestion.type === 'opcion' && datos.includes(this.currentQuestion.ramificar)
      ) {
        if(this.currentQuestion.type === 'opcion') {
          this.responsesArray.push({
            questionNumber: this.currentQuestion.numeroPregunta,
            type: this.currentQuestion.type,
            question: this.currentQuestion.question,
            response: datos
          });
        } else {
          this.responsesArray.push({
            questionNumber: this.currentQuestion.numeroPregunta,
            type: this.currentQuestion.type,
            question: this.currentQuestion.question,
            response: datos[0],
          });
        }
        for (let i = 0; i < this.dataArray!.length; i++) {
          if(this.dataArray![i].numeroPregunta === parseInt(this.currentQuestion.targetQuestion)) {
            this.currentQuestion = this.dataArray![i];
            break;
          }
        }
        //reiniciar data
        this.currentData = [];
        //Reiniciar arreglos para limpiar elecciones activas
        this.restartSelected();
        return
      }
    }

    // Validar segunda ramificacion
    if(this.currentQuestion.ramificar2 && this.currentQuestion.ramificar2 !== 'no') {
      if(
        this.currentQuestion.type === 'calificacion' && parseInt(datos[0]) >= parseInt(this.currentQuestion.ramificar2) ||
        this.currentQuestion.type === 'opcion' && datos.includes(this.currentQuestion.ramificar2)
      ) {
        if(this.currentQuestion.type === 'opcion') {
          this.responsesArray.push({
            questionNumber: this.currentQuestion.numeroPregunta,
            type: this.currentQuestion.type,
            question: this.currentQuestion.question,
            response: datos
          });
        } else {
          this.responsesArray.push({
            questionNumber: this.currentQuestion.numeroPregunta,
            type: this.currentQuestion.type,
            question: this.currentQuestion.question,
            response: datos[0],
          });
        }
        for (let i = 0; i < this.dataArray!.length; i++) {
          if(this.dataArray![i].numeroPregunta === parseInt(this.currentQuestion.target2)) {
            this.currentQuestion = this.dataArray![i];
            break;
          }
        }
        //reiniciar data
        this.currentData = [];
        //Reiniciar arreglos para limpiar elecciones activas
        this.restartSelected();
        return
      }
    }

    // Si la pregunta redirige a otra pregunta
    if(this.currentQuestion.targetQuestion !== 'no' && !this.currentQuestion.ramificar) {
      this.currentQuestion = this.dataArray![parseInt(this.currentQuestion.targetQuestion) - 1];
      if(this.currentQuestion.opcional === false) {
        this.position = this.currentQuestion.numeroPregunta-1;
      }
      //reiniciar data
      this.currentData = [];
      this.restartSelected();
      return;
    }


    // Flujo normal
    this.position++;
    if(this.currentQuestion.type === 'opcion') {
      this.responsesArray.push({
        questionNumber: this.currentQuestion.numeroPregunta,
        type: this.currentQuestion.type,
        question: this.currentQuestion.question,
        response: datos
      });
    } else {
      this.responsesArray.push({
        questionNumber: this.currentQuestion.numeroPregunta,
        type: this.currentQuestion.type,
        question: this.currentQuestion.question,
        response: datos[0]
      });
    }
    this.currentQuestion = this.arrayFlujoNormal[this.position];
    console.log("this.responsesArray: ", this.responsesArray);
    //reiniciar data
    this.currentData = [];
    //Reiniciar arreglos para limpiar elecciones activas
    this.restartSelected();
    console.log("this.currentQuestion: ", this.currentQuestion);
    if(this.currentQuestion === undefined) {
      alert('Fin de la encuesta');
      return;
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                           Obtener pregunta previa                          */
  /* -------------------------------------------------------------------------- */
  getPreviousQuestion = () => {
    const previous = this.responsesArray[this.responsesArray.length -1].questionNumber;
    this.currentQuestion = this.dataArray![previous-1];
    if(this.currentQuestion.opcional === false) {
      this.position = this.currentQuestion.numeroPregunta-1;
    }
    this.responsesArray.pop();
    //Reiniciar arreglos para limpiar elecciones activas
    this.restartSelected();
  }


  // pregunta tipo texto
  getTexto = (text:string) => {
    this.currentData = [];
    this.currentData = [text];
  }
  // Referencia pregunta abierta
  getTextRef = (ref:any) => {
    this.textAreaRef = ref;
  }

  // pregunta tipo opcion multiple
  getOpciones = (ref:any) => {
    this.currentData = [];
    for (let i = 0; i < ref.children.length; i++) {
      if(ref.children[i].children[0].children[0].checked) {
        this.currentData.push(ref.children[i].children[0].children[0].value);
      }
    }
  }
  // Referencia opcion multiple
  getOptionsRef = (ref:any) => {
    this.optionsRef = ref;
  }

  // Permite seleccionar calificacion
  fillScoreArray = () => { for (let i = 1; i <= 10; i++) this.scoreArray.push({active: false, number: i.toString()}) };
  setActiveScore = (index:number) => {
    for (let i = 0; i < this.scoreArray.length; i++) {
      this.scoreArray[i].active = false;
      if(i == index) this.scoreArray[i].active = true
    }
    this.currentData = [];
    this.currentData = [(index+1).toString()];
  }

  // Selecciona calificacion en estrellas
  fillStarsArray = () => { for (let i = 0; i < 5; i++) this.starsArray.push({active: false, number: i+1}) };
  setActiveStars = (index:number) => {
    for (let i = 0; i < this.starsArray.length; i++) {
      this.starsArray[i].active = false;
      if(i <= index) this.starsArray[i].active = true;
    }
    this.currentData = [];
    this.currentData = [(index+1).toString()];
  }

  // Cambia a activo nps seleccionado
  fillNpsArray = () => { for (let i = 0; i < 3; i++) this.npsArray.push({active: false, nps: '' }) };
  setActiveNps = (index:number) => {
    for (let i = 0; i < this.npsArray.length; i++) {
      this.npsArray[i].active = false;
      if(i == index) this.npsArray[i].active = true;
    }
    this.currentData = [];
    this.currentData = [(index+1).toString()];
  }

  restartSelected = () => {
    for (let i = 0; i < this.scoreArray.length; i++) { //calificacion
      this.scoreArray[i].active = false;
    }
    for (let i = 0; i < this.starsArray.length; i++) { //estrellas
      this.starsArray[i].active = false;
    }
    for (let i = 0; i < this.npsArray.length; i++) { //nps
      this.npsArray[i].active = false;
    }
    if(this.optionsRef !== undefined) {
      for (let i = 0; i < this.optionsRef.children.length; i++) {
        this.optionsRef.children[i].children[0].children[0].checked = false;
      }
    }
    if(this.textAreaRef !== undefined) {
      this.textAreaRef.value = '';
    }
  }

  getCurrentQuestion = () => {
    this.currentQuestion = this.arrayFlujoNormal[0];
  }

  getOpcionalOFlujoNormal = () => {
    for (let i = 0; i < this.dataArray!.length; i++) {
      if(!this.dataArray![i].opcional) {
        this.arrayFlujoNormal.push({...this.dataArray![i], contestada: false});
      } else {
        this.arrayOpcionales.push({...this.dataArray![i], contestada: false});
      }
    }
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
    console.log("parse: ", parse);
    this.currentData = [parse]
  }
  logData = (data:string) => console.log(data);

}
