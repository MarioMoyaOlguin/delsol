import { Component, OnInit } from '@angular/core';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';
import { fontStyle } from 'html2canvas/dist/types/css/property-descriptors/font-style';
import { LOGO } from '../logo';
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
  export = false;

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
    {type: 'estrellas', data: [4, 20, 40, 50, 43]},
    {type: 'opcion', data: [56, 20, 40, 50], labels: ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4']},
    {type: 'nps', data: [2, 25, 55], labels: ['Mala', 'Neutral', 'Buena']},
    {type: 'calificacion', data: [3,2,4,5,13,20,40,50,36,14]},
    {type: 'estrellas', data: [4, 20, 40, 50, 43]},
    {type: 'opcion', data: [56, 20, 40, 50], labels: ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4']},
    {type: 'nps', data: [2, 25, 55], labels: ['Mala', 'Neutral', 'Buena']},
    {type: 'calificacion', data: [3,2,4,5,13,20,40,50,36,14]},
    {type: 'estrellas', data: [4, 20, 40, 50, 43]},
  ];

  data = [
    {
        questionNumber: 1,
        type: "opcion",
        question: "¿Que departamentos visitó?",
        response: [
            ["merceria", "carnes"],["ropa", "carnes"],["electronica", "carnes"],["merceria", "electronica"],["merceria", "ropa"],["merceria", "electronica"],["merceria", "ropa"]
        ]
    },
    {
        questionNumber: 2,
        type: "texto",
        question: "¿Que podemos hacer para mejorar el servicio?",
        response: ["gg izi", "facilito", "re izi", "gg izi", "gg izi","gg izi", "gg izi",]
    },
    {
        questionNumber: 3,
        type: "calificacion",
        question: "¿Cómo fue su experiencia de compra?",
        response: ["7", "3", "2", "10", "9", "10", "9"]
    },
    {
        questionNumber: 4,
        type: "estrellas",
        question: "¿Como califica las instalaciones?",
        response: ["4", "4", "3", "4", "5", "4", "5"]
    },
    {
        questionNumber: 5,
        type: "nps",
        question: "¿Como calificaria el trato al cliente?",
        response: ["2", "3", "3", "2", "1", "2", "1"]
    },
    {
        questionNumber: 6,
        type: "fecha",
        question: "¿Cuál es su fecha de cumpleaños?",
        response: ["21-01-2023", "21-01-2023", "21-01-2023", "21-01-2023", "21-01-2023", "21-01-2023", "21-01-2023"]
    },
    {
        questionNumber: 7,
        type: "fecha",
        question: "¿Cuál es su fecha nacimiento?",
        response: ["21-01-2023", "21-01-2023", "21-01-2023", "21-01-2023", "21-01-2023", "21-01-2023", "21-01-2023"]
    }
]

  /* -------------------------------------------------------------------------- */
  /*                                  Funciones                                 */
  /* -------------------------------------------------------------------------- */
  
  /* ---------------------------- Exportar a excel ---------------------------- */
  exportToExcel = (index:number) => {
    // const data = [...this.data ]
    // const jsonData = JSON.stringify(data);
    // const propertyNames = Object.values(this.data[2].response[0]).join('');
    // console.log(typeof propertyNames, propertyNames);
    // const parsed = parseInt(propertyNames);
    // console.log(typeof parsed, parsed);
    // return;
    let workbook:Workbook = new Workbook();
    workbook.creator = 'DelSol';

    const sheet = workbook.addWorksheet(this.pollsArray[index].nombre);
    //ancho de columnas, alineacion y confinar texto
    sheet.getColumn("A").width = 20;
    for (let i = 0; i < this.data.length; i++) {
      const column = sheet.getColumn(i+2);
      column.width = 50;
      column.alignment = {horizontal: 'center', wrapText: true}
    }
    //agregar imagen con titulo
    const logoId = workbook.addImage({
      base64: LOGO,
      extension: 'png',
    })
    sheet.addImage(logoId, {tl: {col:0, row:0}, ext: {width:128, height:128}});
    const titleCell = sheet.getCell("B3");
    titleCell.value = this.pollsArray[index].nombre;
    titleCell.style.font = {bold: true, size: 24, color: {argb: 'f4323f'}};
    //Agregar columna de cabecera
    const headerColumn = sheet.getColumn(1);
    headerColumn.values = ['','','','','','','', 'Tipo', 'Pregunta'];
    const questionNumberCell = sheet.getCell("A8")
    questionNumberCell.font = {bold: true, size: 14,};
    const questionCell = sheet.getCell("A9")
    questionCell.font = {bold: true, size: 14,};
    headerColumn.alignment = {vertical: 'middle'}
    for (let i = 0; i < this.data[0].response.length; i++) {
      const responseNumberCell = sheet.getCell(`A${10+i}`);
      responseNumberCell.value = `Respuesta ${i+1}`;
      responseNumberCell.style.font = {bold: true, size: 11};
    }
    //iterar datos de las preguntas
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < this.data.length; j++) {
        const questionNumberCell = sheet.getCell(7, 2+j);
        const typeCell = sheet.getCell(8, 2+j);
        const questionCell = sheet.getCell(9, 2+j);
        questionNumberCell.value = "Pregunta "+this.data[j].questionNumber;
        questionNumberCell.style.font = {bold: true, size: 14};
        typeCell.value = this.data[j].type;
        questionCell.value = this.data[j].question;
        questionCell.style.font = {bold: true};
        questionCell.style.fill = {type: 'pattern', pattern:'solid', fgColor:{ argb:'f8cbad'}}
      }
    }
    //Respuestas
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[i].response.length; j++) {
        const responseCell = sheet.getCell(10+j, 2+i)
        responseCell.style.fill = {type: 'pattern', pattern:'solid', fgColor:{ argb:'fff2e9'}}
        if(this.data[i].type === 'opcion') {
          const propertyNames = Object.values(this.data[i].response[j]).join(', ');
          responseCell.value = propertyNames;
        } 
        if(this.data[i].type === 'calificacion' || this.data[i].type === 'estrellas' || this.data[i].type === 'nps') {
          const propertyNames = Object.values(this.data[i].response[j]).join('');
          const parsedToInt = parseInt(propertyNames);
          responseCell.value = parsedToInt;
        }
        if(this.data[i].type === 'fecha' || this.data[i].type === 'texto') {
          const propertyNames = Object.values(this.data[i].response[j]).join('');
          responseCell.value = propertyNames;
        }
      }
    }
    //Guardar archivo
    workbook.xlsx.writeBuffer().then( (data) => {
      const blob = new Blob([data]);
      FileSaver.saveAs(blob, this.pollsArray[index].nombre+".xlsx")
    })
  }


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

  setChecked = (index:number) => {
    this.pollsArray[index].checked = !this.pollsArray[index].checked;
    let checkedExist = false;
    for (let index = 0; index < this.pollsArray.length; index++) {
      if(this.pollsArray[index].checked) { checkedExist = true }
    }
    if(checkedExist) { this.export = true }
    else { this.export = false }
  }

  setAll = (checked:boolean) => {
    let checkedExist = false;
    for (let index = 0; index < this.pollsArray.length; index++) {
      this.pollsArray[index].checked = checked;
      if(this.pollsArray[index].checked) { checkedExist = true }
    }
    if(checkedExist) { this.export = true }
    else { this.export = false }
  }

  activatePoll = (index:number) => { this.pollsArray[index].estado = 'activa'; }

  
  /* ----------------------- Secccion visor de encuesta ----------------------- */
  questionsArray = [
    {alert: true, alertTrigger: 'Ropa', done: true, numero: 2, numeroPregunta: 1, opcional: false, optionsArray: [{opcion: 'Ropa', ramificar: true, targetQ: '1'}, {opcion: 'Electrónica', ramificar: true, targetQ: '3'}, {opcion: 'Juguetería', ramificar: false, targetQ: 'no'}, {opcion: 'abarrotes', ramificar: false, targetQ: 'no'}, {opcion: 'merceria', ramificar: false, targetQ: 'no'}, {opcion: 'carnes', ramificar: false, targetQ: 'no'}], required: true, tipoLimite: 'minimo', targetQuestion: 'no', type: 'opcion', question: '¿Que departamentos visitó?'},
    {done: true, numeroPregunta: 2, opcional: false, required: true, targetQuestion: 'no', type: 'texto', question: '¿Que podemos hacer para mejorar el servicio?'},
    {alert: true, alertTrigger: '2', done: true, high:'Excelente', low: 'Pesima', numeroPregunta: 3, opcional: false, ramificar: '2', ramificar2: '10', required: true, target2: '6', targetQuestion: '1', type: 'calificacion', question: '¿Cómo fue su experiencia de compra?'},
    {alert: false, alertTrigger: 'no', bad: 'Pesimas', done: true, good: 'Excelentes', neutral: 'Neutral', numeroPregunta: 4, opcional: false, ramificar: 'no', ramificar2: 'no', required: true, target2: 'no', targetQuestion: 'no', type: 'estrellas', question: '¿Como califica las instalaciones?'},
    {alert: false, alertTrigger: 'no', bad: 'Malo', done: true, good: 'Excelente', neutral: 'Neutral', numeroPregunta: 5, opcional: false, ramificar: 'no', ramificar2: 'no', required: true, target2: 'no', targetQuestion: 'no', type: 'nps', question: '¿Como calificaria el trato al cliente?'},
    {done: true, numeroPregunta: 6, opcional: false, required: true, targetQuestion: 'no', type: 'fecha', question: '¿Cuál es su fecha de cumpleaños?'},
  ]
  
  routeViewer = () => {
    this.route = !this.route;
  }

  /* ------------- servicio login, identificar el tipo de usuario ------------- */
  user = 'administrador';

}
