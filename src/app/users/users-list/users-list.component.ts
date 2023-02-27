import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  editing = false;

  usersArray:any[] = [
    {nombre: 'Juan Perez', tipo: 'Empleado', tienda: 'Tienda 1', puesto: 'Empleado', done: true},
    {nombre: 'Juan Carlos Lopez Hernandez', tipo: 'Encargado', tienda: 'Tienda 2', puesto: 'Gerente', done: true},
    {nombre: 'Victor Perez Hernandez', tipo: 'Administrador', tienda: 'Tienda 3', puesto: 'Gerente', done: true},
  ];

  edit = (index:number) => {
    this.editing = true;
    this.usersArray[index].done = false;
  }

  setData = (index:number, data:string[]) => {
    if(data[0] === '' || data[1] === '' || data[2] === '' || data[3] === '' || data[4] === '') {
      return
    }
    this.usersArray[index].nombre = data[0];
    this.usersArray[index].correo = data[1];
    this.usersArray[index].tipo = data[2];
    this.usersArray[index].tienda = data[3];
    this.usersArray[index].puesto = data[4];
    this.usersArray[index].done = true;
    console.log("this.usersArray[index]: ", this.usersArray[index]);
    this.editing = false;
  }

  deleteUser = () => {
    
  }

  cancelEdit = (index:number) => {
    this.usersArray[index].done = true;
    this.editing = false;
  }

}
