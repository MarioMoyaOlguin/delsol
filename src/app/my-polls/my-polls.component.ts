import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-my-polls',
  templateUrl: './my-polls.component.html',
  styleUrls: ['./my-polls.component.scss']
})


export class MyPollsComponent implements OnInit {

  constructor(public loginUser:LoginService) {  }

  ngOnInit(): void {

  }

  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  editing = false;
  showChart = false;
  pollTitle = '';
  route = false;

  pollsArray:any[] = [
    {checked: false, nombre: 'Encuesta prueba ', num: '5', estado: 'activa', respuestas: '134', done: true},
    {checked: false, nombre: 'Instalaciones ', num: '24', estado: 'activa', respuestas: '146', done: true},
    {checked: false, nombre: 'Encuesta electrónica ', num: '31', estado: 'inactiva', respuestas: '0', done: true},
    {checked: false, nombre: 'Atención al cliente ', num: '46', estado: 'cerrada', respuestas: '200', done: true},
    {checked: false, nombre: 'Encuesta dto. ropa ', num: '20', estado: 'cerrada', respuestas: '200', done: true},
    {checked: false, nombre: 'Experiencia de compras ', num: '23', estado: 'inactiva', respuestas: '0', done: true}
  ];

  charts = [
    {type: 'estrellas', data: [4, 20, 40, 50, 43]},
    {type: 'opcion', data: [56, 20, 40, 50], labels: ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4']},
    {type: 'nps', data: [2, 25, 55], labels: ['Mala', 'Neutral', 'Buena']},
    {type: 'calificacion', data: [3,2,4,5,13,20,40,50,36,14]},
    {type: 'estrellas', data: [3, 20, 40, 50, 43]}
  ];

  /* -------------------------------------------------------------------------- */
  /*                                  Funciones                                 */
  /* -------------------------------------------------------------------------- */
  setShowChart = () => { this.showChart = !this.showChart };

  setPollTitle = (index:number) => { this.pollTitle = this.pollsArray[index].nombre };

  viewCharts = (index:number) => {
    this.setPollTitle(index);
    this.setShowChart();
  }
  
  edit = (index:number) => {
    this.editing = true;
    this.pollsArray[index].done = false;
  }

  setData = (index:number, data:string[]) => {
    if(data[0] === '' || data[1] === '') { return }
    this.pollsArray[index] = {
      ...this.pollsArray[index],
      nombre: data[0],
      estado: data[1],
      done: true,
    }
    console.log("this.usersArray[index]: ", this.pollsArray[index]);
    this.editing = false;
  }

  cancelEdit = (index:number) => {
    this.pollsArray[index].done = true;
    this.editing = false;
  }

  setChecked = (index:number) => { this.pollsArray[index].checked = !this.pollsArray[index].checked; }

  setAll = (checked:boolean) => {
    for (let index = 0; index < this.pollsArray.length; index++) {
      this.pollsArray[index].checked = checked;
    }
  }

  activatePoll = (index:number) => { this.pollsArray[index].estado = 'activa'; }

  
  /* ----------------------- Secccion visor de encuesta ----------------------- */
  questionsArray = [
    {alert: true, alertTrigger: 'Ropa', done: true, numero: 2, numeroPregunta: 1, opcional: false, optionsArray: [{opcion: 'Ropa', ramificar: true, targetQ: '1'}, {opcion: 'Electrónica', ramificar: true, targetQ: '3'}, {opcion: 'Juguetería', ramificar: false, targetQ: 'no'}, {opcion: 'abarrotes', ramificar: false, targetQ: 'no'}, {opcion: 'merceria', ramificar: false, targetQ: 'no'}, {opcion: 'carnes', ramificar: false, targetQ: 'no'}], required: false, tipoLimite: 'minimo', targetQuestion: 'no', type: 'opcion', question: '¿Que departamentos visitó?'},
    {done: true, numeroPregunta: 2, opcional: false, required: false, targetQuestion: 'no', type: 'texto', question: '¿Que podemos hacer para mejorar el servicio?'},
    {alert: true, alertTrigger: '2', done: true, high:'Excelente', low: 'Pesima', numeroPregunta: 3, opcional: false, ramificar: '2', ramificar2: '10', required: false, target2: '6', targetQuestion: '1', type: 'calificacion', question: '¿Cómo fue su experiencia de compra?'},
    {alert: false, alertTrigger: 'no', bad: 'Pesimas', done: true, good: 'Excelentes', neutral: 'Neutral', numeroPregunta: 4, opcional: false, ramificar: 'no', ramificar2: 'no', required: false, target2: 'no', targetQuestion: 'no', type: 'estrellas', question: '¿Como califica las instalaciones?'},
    {alert: false, alertTrigger: 'no', bad: 'Malo', done: true, good: 'Excelente', neutral: 'Neutral', numeroPregunta: 5, opcional: false, ramificar: 'no', ramificar2: 'no', required: false, target2: 'no', targetQuestion: 'no', type: 'nps', question: '¿Como calificaria el trato al cliente?'},
    {done: true, numeroPregunta: 6, opcional: false, required: false, targetQuestion: 'no', type: 'fecha', question: '¿Cuál es su fecha de cumpleaños?'},
  ]
  
  routeViewer = () => {
    this.route = !this.route;
  }
  /* -------------------------------------------------------------------------- */

  /* ------------- servicio login, identificar el tipo de usuario ------------- */
  user = 'normal';

}
