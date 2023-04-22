import { Component, OnInit } from '@angular/core';
import { fade } from 'src/app/animations';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  animations: [
    fade
  ],
})
export class UsersListComponent implements OnInit {

  constructor(private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  editing = false;

  usersArray:any[] = [ ];

  /* ---------------------------- Obtener usuarios ---------------------------- */
  getAllUsers = () => {
    this.firestore.getUsers().subscribe( resp => {
      console.log("resp: ", resp);
      this.usersArray = resp;
      for (let i = 0; i < this.usersArray.length; i++) { this.usersArray[i].done = true; }
    });
  }

  /* ----------------------------- Editar usuario ----------------------------- */
  edit = (index:number) => {
    this.editing = true;
    this.usersArray[index].done = false;
  }
  cancelEdit = (index:number) => {
    this.usersArray[index].done = true;
    this.editing = false;
  }

  setData = (index:number, data:string[]) => {
    console.log("data: ", data);
    if(data[0] === '' || data[1] === '' || data[2] === '') { return }
    this.firestore.updateUser({
      id: this.usersArray[index].id,
      nombre: data[0],
      tipo: data[1],
      tienda: data[2]
    });
    this.editing = false;
  }

  /* ---------------------------- Eliminar usuario ---------------------------- */
  userIndex = 0;
  dialog = false;

  deleteUser = (index:number) => {
    this.userIndex = index;
    this.dialog = true;
  }
  //Proceder o cancelar
  proceedDelete = () => {
    const id = this.usersArray[this.userIndex].idDoc;
    this.firestore.deleteUser(id);
    this.dialog = false;
  }
  cancelDelete = () => {
    this.userIndex = 0;
    this.dialog = false;
  }

}
