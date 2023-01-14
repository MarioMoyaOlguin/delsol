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
    {id: '00001', nombre: 'DelSol 1', ubicacion: 'Monterrey', empleados: '120', done: true},
    {id: '00002', nombre: 'DelSol 2', ubicacion: 'Mexico', empleados: '201', done: true},
    {id: '00003', nombre: 'DelSol 3', ubicacion: 'Tijuana', empleados: '94', done: true},
    {id: '00004', nombre: 'DelSol 4', ubicacion: 'San Luis Potosí', empleados: '128', done: true},
    {id: '00005', nombre: 'DelSol 5', ubicacion: 'Leon', empleados: '132', done: true},
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
    this.storesArray[index].ubicacion = data[1];
    this.storesArray[index].empleados = data[2];
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
