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

  @Input() dataArray?:any[] = [];

  position = 0; //Posicion en el array de flujo normal
  tempBranch = false //para determinbar si se selecciono opcion que se ramifica
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
  nextQuestion = (datos:any[]) => {
    console.log("datos: ", datos);
    //Validaciones de datos registrados
    if(this.currentData.length < 1 && this.currentQuestion.required) { // Validar que el campo no este vacio si es obligatorio
      alert('Por favor rellene los datos');
      return;
    }
    if(this.currentQuestion.required && datos[0] === '') { return }
    if(datos[0] === undefined) { datos = ['sin respuesta']; }
    // Registrar al arreglo de respuestas
    this.responsesArray.push({
      questionNumber: this.currentQuestion.numeroPregunta,
      type: this.currentQuestion.type,
      question: this.currentQuestion.question,
      response: this.currentQuestion.type === 'opcion' ? datos : datos[0] // guardar respuesta en forma de arreglo o string
    });

    // Manejar ramificaciones de acuerdo al tipo de pregunta contestada
    switch (this.currentQuestion.type) {
      case 'texto':
      case 'fecha':
        if(this.currentQuestion.targetQuestion !== 'no') { //si redirige a pregunta en especifico
          this.currentQuestion = this.dataArray![parseInt(this.currentQuestion.targetQuestion) - 1];
          if(!this.currentQuestion.opcional) { this.position = this.currentQuestion.numeroPregunta - 1} //si no es pregunta opcional
        }
        else { //si no redirige, se obtiene la siguiente del flujo normal
          this.position++;
          this.currentQuestion = this.arrayFlujoNormal[this.position];
        }
        break;

      case 'calificacion':
      case 'estrellas':
      case 'nps':
        const score = parseInt(datos[0]);
        if(this.currentQuestion.ramificar !== 'no' && score <= parseInt(this.currentQuestion.ramificar)) { //si hay una primera ramificacion
          this.currentQuestion = this.dataArray![parseInt(this.currentQuestion.targetQuestion) - 1];
          if(!this.currentQuestion.opcional) { this.position = this.currentQuestion.numeroPregunta - 1};
        } else if(this.currentQuestion.ramificar2 !== 'no' && score >= parseInt(this.currentQuestion.ramificar2)) { //si hay segunda ramifiacion
          this.currentQuestion = this.dataArray![parseInt(this.currentQuestion.target2) - 1];
          if(!this.currentQuestion.opcional) { this.position = this.currentQuestion.numeroPregunta - 1}
        } else {
          this.position++;
          this.currentQuestion = this.arrayFlujoNormal[this.position];
        }
        break;

      case 'opcion':
        for (let i = 0; i < datos.length; i++) { //comprobar si coinciden las respuestas con el arreglo opciones
          for (let j = 0; j < this.currentQuestion.optionsArray.length; j++) {
            if(datos[i] === this.currentQuestion.optionsArray[j].opcion && this.currentQuestion.optionsArray[j].ramificar) { //si coincide y se ramifica
              this.currentQuestion = this.dataArray![parseInt(this.currentQuestion.optionsArray[j].targetQ) - 1];
              this.tempBranch = true;
              break;
            }
          }
          if(this.tempBranch) { break }
        }
        if(this.tempBranch) {
          if(!this.currentQuestion.opcional) { this.position = this.currentQuestion.numeroPregunta - 1}
        } else {
          this.position++;
          this.currentQuestion = this.arrayFlujoNormal[this.position];
        }
        break;
      }
      
      //reiniciar data
      this.currentData = [];
      this.tempBranch = false;
      this.restartSelected();
      console.log("this.position: ", this.position);
      console.log(this.responsesArray);
      console.log(this.currentQuestion);
      
      if (this.currentQuestion === undefined) {
        alert('fin de la encuesta');
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

  /* -------------------------- Limitador de opciones ------------------------- */
  limitChecks = (ref:any) => {
    // console.log("ref: ", ref.children[0].children[0].children[0].checked);
    let checkedCounter = 0;
    for (let i = 0; i < ref.children.length; i++) {
      if(ref.children[i].children[0].children[0].checked) { checkedCounter++ }
      
    }
    switch (this.currentQuestion.tipoLimite) {
      case 'fija':
        if(checkedCounter === this.currentQuestion.numero) {
          for (let i = 0; i < ref.children.length; i++) {
            if(ref.children[i].children[0].children[0].checked) { ref.children[i].children[0].classList.remove('disabled') }
            else { ref.children[i].children[0].classList.add('disabled') }
          }
        } else { 
          for (let i = 0; i < ref.children.length; i++) {
            ref.children[i].children[0].classList.remove('disabled')
          }
        }
        break;
    }

  }

  /* ------------------ obtener respuesta pregunta tipo texto ----------------- */
  getTexto = (text:string) => {
    this.currentData = [];
    this.currentData = [text];
  }
  /* ----------------------- Referencia pregunta abierta ---------------------- */
  getTextRef = (ref:any) => { this.textAreaRef = ref; }

  /* ------ obtener casillas seleccionadas pregunta tipo opcion multiple ------ */
  getOpciones = (ref:any, index:number) => {
    // Registrar data
    this.currentData = [];
    for (let i = 0; i < ref.children.length; i++) { //registrar seleccionados
      if(ref.children[i].children[0].children[0].checked) {
        this.currentData.push(ref.children[i].children[0].children[0].value);
      }
    }

    //Validar cantidad de opciones que se pueden seleccionar
    let checkedCounter = 0;
    let branchedIndex = 0;
    let branchedSelected = false;
    for (let i = 0; i < ref.children.length; i++) { //contar opciones seleccionadas
      if(ref.children[i].children[0].children[0].checked) { checkedCounter++ }
      if(ref.children[i].children[0].children[0].checked && this.currentQuestion.optionsArray[i].ramificar) {
        branchedSelected = true;
        branchedIndex = i;
      }
    }
    switch (this.currentQuestion.tipoLimite) {
      case 'fija':
      case 'maximo':
        if(checkedCounter === this.currentQuestion.numero) {
          for (let i = 0; i < ref.children.length; i++) {
            if(!ref.children[i].children[0].children[0].checked) { ref.children[i].children[0].classList.add('disabled') }
          }
        }
        else { 
          for (let i = 0; i < ref.children.length; i++) {
            if(!ref.children[i].children[0].children[0].checked) { ref.children[i].children[0].classList.remove('disabled') }
            //Deshabilitar nuevamente la opcion si ya hay una ramificada seleccionada
            if(branchedSelected && this.currentQuestion.optionsArray[i].ramificar && i !== branchedIndex) {
              ref.children[i].children[0].classList.add('disabled')
            }
          }
        }
        break;

      
        
    }
  }

  temp = (ref:any, index:any) => {
    //validar que no se seleccionen dos opciones que ramifiquen
    const selected = this.currentQuestion.optionsArray[index];
    if(selected.ramificar && ref.children[index].children[0].children[0].checked) { //si se selecciona y se ramifica
      for (let i = 0; i < ref.children.length; i++) { //deshabilitar todas las opciones que se ramifican
        if (this.currentQuestion.optionsArray[i].ramificar) {
          ref.children[i].children[0].classList.add('disabled');
        }
      }
      ref.children[index].children[0].classList.remove('disabled'); //volver a habilitar la opcion seleccionada
    }
    if(selected.ramificar && !ref.children[index].children[0].children[0].checked) { //si se selecciona pero no ramifica
      for (let i = 0; i < ref.children.length; i++) { //habilitar todas las opciones que se ramifican
        if (this.currentQuestion.optionsArray[i].ramificar) {
          ref.children[i].children[0].classList.remove('disabled');
        }
      }
    }
  }



  /* ----------------------- Referencia opcion multiple ----------------------- */
  getOptionsRef = (ref:any) => { this.optionsRef = ref; }

  /* -------------------- Permite seleccionar calificacion -------------------- */
  fillScoreArray = () => { for (let i = 1; i <= 10; i++) this.scoreArray.push({active: false, number: i.toString()}) };
  setActiveScore = (index:number) => {
    for (let i = 0; i < this.scoreArray.length; i++) {
      this.scoreArray[i].active = false;
      if(i == index) this.scoreArray[i].active = true
    }
    this.currentData = [];
    this.currentData = [(index+1).toString()];
  }

  /* ------------------ Selecciona calificacion en estrellas ------------------ */
  fillStarsArray = () => { for (let i = 0; i < 5; i++) this.starsArray.push({active: false, number: i+1}) };
  setActiveStars = (index:number) => {
    for (let i = 0; i < this.starsArray.length; i++) {
      this.starsArray[i].active = false;
      if(i <= index) this.starsArray[i].active = true;
    }
    this.currentData = [];
    this.currentData = [(index+1).toString()];
  }

  /* -------------------- Cambia a activo nps seleccionado -------------------- */
  fillNpsArray = () => { for (let i = 0; i < 3; i++) this.npsArray.push({active: false, nps: '' }) };
  setActiveNps = (index:number) => {
    for (let i = 0; i < this.npsArray.length; i++) {
      this.npsArray[i].active = false;
      if(i == index) this.npsArray[i].active = true;
    }
    this.currentData = [];
    this.currentData = [(index+1).toString()];
  }

  /* ------------------------- limpiar las respuestas ------------------------- */
  restartSelected = () => {
    for (let i = 0; i < this.scoreArray.length; i++) { //calificacion
      this.scoreArray[i].active = false;
    }
    for (let i = 0; i < this.starsArray.length; i++) { //estrellas
      this.starsArray[i].active = false;
    }
    for (let i = 0; i < this.npsArray.length; i++) { // nps
      this.npsArray[i].active = false;
    }
    if(this.optionsRef !== undefined) { // opciones
      for (let i = 0; i < this.optionsRef.children.length; i++) {
        this.optionsRef.children[i].children[0].children[0].checked = false;
      }
    }
    if(this.textAreaRef !== undefined) { // texto
      this.textAreaRef.value = '';
    }
  }

  /* ------------------------ obtener pregunta inicial ------------------------ */
  getCurrentQuestion = () => {
    this.currentQuestion = this.arrayFlujoNormal[0];
  }

  /* ----- obtener los arreglos de preguntas opcionales y de flujo normal ----- */
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
