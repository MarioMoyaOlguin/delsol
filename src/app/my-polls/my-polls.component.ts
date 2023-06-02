import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';
import { fontStyle } from 'html2canvas/dist/types/css/property-descriptors/font-style';
import { fade } from '../animations';
import { LOGO } from '../logo';
import { FirestoreService } from '../services/firestore.service';
import { LoginService } from '../services/login.service';



@Component({
  selector: 'app-my-polls',
  templateUrl: './my-polls.component.html',
  styleUrls: ['./my-polls.component.scss'],
  animations: [
    fade
  ],
})


export class MyPollsComponent implements OnInit {

  constructor(private firestore:FirestoreService) {  }

  ngOnInit(): void {
    this.getPolls();
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  editing = false;
  showChart = false;
  pollTitle = '';
  route = false;
  export = false;

  pollsArray:any[] = [];
  charts:any = [];
  countedData:number[][] = [];
  data:any = [];
  pollIndex:number = 0;

  /* -------------------------------------------------------------------------- */
  /*                                  Funciones                                 */
  /* -------------------------------------------------------------------------- */

  /* ---------------------------- Obtener encuestas --------------------------- */
  getPolls = () => {
    this.firestore.getPolls().subscribe( resp => {
      this.pollsArray = [];
      for (let i = 0; i < resp.length; i++) {
        const poll = resp[i];
        this.pollsArray.push({
          ...poll,
          done: true,
          pollMenu: false,
        });
      }
      console.log("this.pollsArray: ", this.pollsArray);
    })
  }

  /* ----------------------------- Borrar encuesta ---------------------------- */
  dialog = false;

  deletePoll = (index:number) => {
    this.pollIndex = index;
    this.dialog = true;
  }
  //Proceder o cancelar
  proceedDelete = () => {
    const id = this.pollsArray[this.pollIndex].idDoc;
    this.firestore.deletePoll(id);
    this.pollsArray.splice(this.pollIndex, 1);
    this.dialog = false;
  }
  cancelDelete = () => {
    this.pollIndex = 0;
    this.dialog = false;
  }

  /* ----------------------------- Editar encuesta ---------------------------- */
  edit = (index:number) => {
    this.editing = true;this.data
    this.pollsArray[index].done = false;
  }
  setData = (index:number, data:string[]) => {
    if(data[0] === '' || data[1] === '') { return }
    this.pollsArray[index].titulo = data[0];
    this.pollsArray[index].estado = data[1];
    this.pollsArray[index].done = true;
    const newPolls = [...this.pollsArray];
    console.log("newPolls: ", newPolls);
    const editedPoll = this.pollsArray[index];
    console.log("editedPoll: ", editedPoll);
    this.firestore.updatePollResponses(editedPoll);
    this.editing = false;
  }
  
  /* ---------------------------- Exportar a excel ---------------------------- */
  multisheetToExcel = (index?:number[]) => {
    let indexes:number[] = [];
    if(index) { indexes = [...index]}
    else {
      for (let i = 0; i < this.pollsArray.length; i++) {
        if(this.pollsArray[i].checked) { indexes.push(i) }
      }
    }
    this.exportToExcel(indexes);
  }

  exportToExcel = (index:number[]) => {
    let workbook:Workbook = new Workbook();
    workbook.creator = 'DelSol';

    //crear hojas de excel con la data
    this.createExcelSheets(workbook, index);

    //Guardar archivo
    workbook.xlsx.writeBuffer().then( (data) => {
      const blob = new Blob([data]);
      if(index.length == 1) { FileSaver.saveAs(blob, this.pollsArray[index[0]].titulo+".xlsx") }
      else { FileSaver.saveAs(blob, "Encuestas.xlsx") }
    })
  }

  createExcelSheets = (workbook:any, index:number[]) => {
    console.log("index: ", index);
    for (let i = 0; i < index.length; i++) { //Por cada casilla de encuesta seleccionada
      const data = [...this.pollsArray[index[i]].respuestas];
      console.log("data: ", data);
      const sheet = workbook.addWorksheet(this.pollsArray[index[i]].titulo);
      //ancho de columnas, alineacion y confinar texto
      sheet.getColumn("A").width = 20;
      const questions = [...this.pollsArray[index[i]].preguntas];
      console.log("questions: ", questions);
      for (let i = 0; i < questions.length; i++) {
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
      titleCell.value = this.pollsArray[index[i]].titulo;
      titleCell.style.font = {bold: true, size: 24, color: {argb: 'f4323f'}};
      //Agregar columna de cabecera
      const headerColumn = sheet.getColumn(1);
      headerColumn.values = ['','','','','','','', 'Tipo', 'Pregunta', 'Respuestas'];
      headerColumn.alignment = {vertical: 'middle'};
      const questionNumberCell = sheet.getCell("A8")
      questionNumberCell.font = {bold: true, size: 14,};
      const questionCell = sheet.getCell("A9")
      questionCell.font = {bold: true, size: 14,};
      const responsesCell = sheet.getCell("A10");
      responsesCell.font = {bold: true, size: 14,};
      //iterar datos de las preguntas
      for (let j = 0; j < this.pollsArray[index[i]].preguntas.length; j++) {
        const questionNumberCell = sheet.getCell(7, 2+j);
        questionNumberCell.value = `Pregunta ${j+1}`;
        questionNumberCell.style.font = {bold: true, size: 14};
        const typeCell = sheet.getCell(8, 2+j);
        typeCell.value = this.pollsArray[index[i]].preguntas[j].type;
        const questionCell = sheet.getCell(9, 2+j);
        questionCell.value = this.pollsArray[index[i]].preguntas[j].question;
        questionCell.style.font = {bold: true};
        questionCell.style.fill = {type: 'pattern', pattern:'solid', fgColor:{ argb:'f8cbad'}}
      }
      //Respuestas
      for (let i = 0; i < data.length; i++) { //Por cada encuesta contestada
        const element = data[i];
        for (let j = 0; j < data[i].respuestas.length; j++) { //Por cada pregunta contestada
          const numeroPregunta = data[i].respuestas[j].questionNumber;
          for (let k = 0; k < questions.length; k++) { //Por cada pregunta de la encuesta
            const numComparar = questions[k].numeroPregunta;
            if(numeroPregunta == numComparar) {
              const responseCell = sheet.getCell(10+i, 2+k)
              responseCell.style.fill = {type: 'pattern', pattern:'solid', fgColor:{ argb:'fff2e9'}}
              responseCell.value = data[i].respuestas[j].response;
            }
          }
        }
      }
    }
  }
  
  /* -------------------------------------------------------------------------- */
  /*                Visualizar los datos de encuesta en graficas                */
  /* -------------------------------------------------------------------------- */
  setShowChart = () => { this.showChart = !this.showChart };

  setPollTitle = (index:number) => { this.pollTitle = this.pollsArray[index].titulo };

  viewCharts = (index:number) => {
    if(this.pollsArray[index].respuestas.length < 1) { return }
    this.setPollTitle(index);
    this.charts = [];
    const questions = this.pollsArray[index].preguntas.filter((question:any) => question.type !== 'texto' && question.type !== 'fecha' && question.type !== 'lista');
    console.log("questions: ", questions);
    const responsesArray = this.pollsArray[index].respuestas;
    // console.log("responsesArray: ", responsesArray);
    this.charts = questions;
    // Nuevo arreglo para recibir solo las respuestas
    let filteredResponses:any = [];
    //Obtener los numeros de pregunta para recibir las respuestas
    for (let i = 0; i < questions.length; i++) {
      const element = questions[i];
      filteredResponses.push({
        numeroPregunta: element.numeroPregunta,
        respuestas: []
      })
    }
    //Obtener respuestas respectivas a cada pregunta en el filteredResponses
    for (let i = 0; i < questions.length; i++) { //Por cada pregunta filtrada
      const numPregunta = questions[i].numeroPregunta;
      for (let j = 0; j < responsesArray.length; j++) {//Por cada vez que se contesta la encuesta
        for (let k = 0; k < responsesArray[j].respuestas.length; k++) {//Iterar el array de respuestas
          const numComparar = responsesArray[j].respuestas[k].questionNumber;
          const response = responsesArray[j].respuestas[k].response;
          if(numPregunta == numComparar) {
            filteredResponses[i].respuestas.push(response)
          }
        }
      }
    }
    let labelsData:any = [];
    let labelsArray:any = [];
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < filteredResponses.length; j++) {
        const element = filteredResponses[j];
        if(questions[i].numeroPregunta === element.numeroPregunta) {
          let labels:any = [];
          if(questions[i].type === 'opcion') {
            labels = questions[i].optionsArray.map( (item:any) => {
              return item.opcion
            });
          };
          if(questions[i].type === 'calificacion') { labels = ['1','2','3','4','5','6','7','8','9','10'] };
          if(questions[i].type === 'estrellas') { labels = ['1','2','3','4','5'] };
          if(questions[i].type === 'nps') { labels = ['1','2','3'] };
          labelsArray.push({
            numeroPregunta: questions[i].numeroPregunta,
            labels: labels
          });
          labelsData.push({
            numeroPregunta: questions[i].numeroPregunta,
            data: element.respuestas
          });
        }
      }
    }
    console.log("labelsArray: ", labelsArray);
    console.log("labelsData: ", labelsData);
    let arrayOfCountedData = [];
    for (let i = 0; i < labelsArray.length; i++) {
      const label = labelsArray[i];
      const data = labelsData[i];
      
      let arrayOfCounted = [];
      for (let j = 0; j < label.labels.length; j++) {
        const labelToCompare = label.labels[j];
        let counter = 0;
        
        for (let k = 0; k < data.data.length; k++) {
          const dataToCompare = data.data[k];

          if(typeof data.data[k] == typeof []) {
            for (let l = 0; l < data.data[k].length; l++) {
              const element = data.data[k][l];
              if(labelToCompare === data.data[k][l]) {
                counter++;
              }
            }
          }
          if(labelToCompare === dataToCompare) {
            counter++;
          }
        }
        arrayOfCounted.push(counter);
      }
      arrayOfCountedData.push(arrayOfCounted);
    }
    // console.log("arrayOfCountedData: ", arrayOfCountedData);
    this.countedData = [...arrayOfCountedData];
    // console.log("this.charts: ", this.charts);
    // console.log("this.countedData: ", this.countedData);
    this.setShowChart();
  }/* -------------------------------------------------------------------------- */

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
  questionsArray = []
  
  routeViewer = () => {
    this.route = !this.route;
  }

  /* ----------------------------------- QR ----------------------------------- */
  qrCode = false;
  qrLink = false;
  showLink = false;
  urlSegura:SafeUrl = '';
  enlaceUrl = '';
  nombreQr = '';
  baseUrl = 'http://localhost:4200';

  downloadQr = (e:any, index:number) => {
    e.preventDefault();
    this.enlaceUrl = `${this.baseUrl}/app/encuesta/${this.pollsArray[index].id}`;
    this.urlSegura = `${this.baseUrl}/app/encuesta/${this.pollsArray[index].id}`;
    this.nombreQr = `Encuesta_${this.pollsArray[index].titulo}`;
    this.qrCode = true;
  }
  closeQrWindow = () => this.qrCode = false;

  generateQrLink = (index:number) => {
    this.enlaceUrl = `${this.baseUrl}/app/encuesta/${this.pollsArray[index].id}`;
    this.qrLink = true;
  }
  closeLinkQr = () => this.qrLink = false;

  copyText(): void {
    navigator.clipboard.writeText(this.enlaceUrl).catch(() => {
      console.error("Unable to copy text");
    });
    this.showLink = true;
    setTimeout(() => {
      this.showLink = false;
    }, 2000);
  }

  /* ------------------------ Menu opciones de encuesta ----------------------- */
  menu = false;
  openPollMenu = (index:number) => {
    this.menu = !this.menu;
    this.pollsArray[index].pollMenu = !this.pollsArray[index].pollMenu;
  }

}
