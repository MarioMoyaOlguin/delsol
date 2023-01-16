import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-polls',
  templateUrl: './my-polls.component.html',
  styleUrls: ['./my-polls.component.scss']
})
export class MyPollsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  editing = false;

  pollsArray:any[] = [
    {checked: false, nombre: 'Encuesta prueba ', num: '5', estado: 'activo', respuestas: '134', done: true},
    {checked: false, nombre: 'Instalaciones ', num: '24', estado: 'activo', respuestas: '146', done: true},
    {checked: false, nombre: 'Encuesta electrónica ', num: '31', estado: 'activo', respuestas: '167', done: true},
    {checked: false, nombre: 'Atención al cliente ', num: '46', estado: 'cerrado', respuestas: '200', done: true},
    {checked: false, nombre: 'Encuesta dto. ropa ', num: '20', estado: 'cerrado', respuestas: '200', done: true},
    {checked: false, nombre: 'Experiencia de compras ', num: '23', estado: 'activo', respuestas: '116', done: true}
  ];
  
  edit = (index:number) => {
    this.editing = true;
    this.pollsArray[index].done = false;
  }

  setData = (index:number, data:string[]) => {
    if(data[0] === '' || data[1] === '') {
      return
    }
    this.pollsArray[index].nombre = data[0];
    this.pollsArray[index].estado = data[1];
    this.pollsArray[index].done = true;
    console.log("this.usersArray[index]: ", this.pollsArray[index]);
    this.editing = false;
  }

  deleteUser = () => {
    
  }

  cancelEdit = (index:number) => {
    this.pollsArray[index].done = true;
    this.editing = false;
  }

  setChecked = (index:number) => {
    this.pollsArray[index].checked = !this.pollsArray[index].checked;
  }

  setAll = (checked:boolean) => {
    for (let index = 0; index < this.pollsArray.length; index++) {
      this.pollsArray[index].checked = checked;
    }
  }

}
