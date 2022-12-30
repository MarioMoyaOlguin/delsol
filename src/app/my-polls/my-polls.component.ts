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

  rename = (index:number) => {
    this.editing = true;
    this.pollsArray[index].done = false;
  }

  setName = (name:string, index:number) => {
    if(name === '') {
      return
    }
    this.pollsArray[index].nombre = name;
    this.pollsArray[index].done = true;
    this.editing = false;
  }

}
