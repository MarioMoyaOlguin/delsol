import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  editing = false;

  storesArray = [
    {id: '00001', nombre: 'DelSol 1', estado: 'Nuevo Leon', ciudad: 'Monterrey', done: true},
    {id: '00002', nombre: 'DelSol 2', estado: 'Ciudad de Mexico', ciudad: 'Alvaro Obregon', done: true},
    {id: '00003', nombre: 'DelSol 3', estado: 'Baja California', ciudad: 'Tijuana', done: true},
    {id: '00004', nombre: 'DelSol 4', estado: 'San Luis Potosí', ciudad: 'San Luis Potosí', done: true},
    {id: '00005', nombre: 'DelSol 5', estado: 'Guanajuato', ciudad: 'Leon', done: true},
  ]

  edit = (index:number) => {
    this.editing = true;
    this.storesArray[index].done = false;
  }

  setData = (index:number, data:string[]) => {
    if(data[0] === '' || data[1] === '' || data[2] === '') {
      return
    }
    this.storesArray[index].nombre = data[0];
    this.storesArray[index].estado = data[1];
    this.storesArray[index].ciudad = data[2];
    this.storesArray[index].done = true;
    console.log("this.usersArray[index]: ", this.storesArray[index]);
    this.editing = false;
  }

  deleteUser = () => {
    
  }

  cancelEdit = (index:number) => {
    this.storesArray[index].done = true;
    this.editing = false;
  }
}
