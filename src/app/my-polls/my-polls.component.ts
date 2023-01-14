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
    {nombre: 'Encuesta prueba ', num: '5', estado: 'activo', respuestas: '134 / 200', done: true},
    {nombre: 'Instalaciones ', num: '24', estado: 'activo', respuestas: '146 / 200', done: true},
    {nombre: 'Encuesta electrónica ', num: '31', estado: 'activo', respuestas: '167 / 200', done: true},
    {nombre: 'Atención al cliente ', num: '46', estado: 'cerrado', respuestas: '200 / 200', done: true},
    {nombre: 'Encuesta dto. ropa ', num: '20', estado: 'cerrado', respuestas: '200 / 200', done: true},
    {nombre: 'Experiencia de compras ', num: '23', estado: 'activo', respuestas: '116 / 200', done: true}
  ];
  
  edit = (index:number) => {
    this.editing = true;
    this.pollsArray[index].done = false;
  }

  setData = (index:number, data:string[]) => {
    if(data[0] === '' || data[1] === '' || data[2] === '' || data[3] === '') {
      return
    }
    this.pollsArray[index].nombre = data[0];
    this.pollsArray[index].num = data[1];
    this.pollsArray[index].estado = data[2];
    this.pollsArray[index].respuestas = data[3];
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

}
