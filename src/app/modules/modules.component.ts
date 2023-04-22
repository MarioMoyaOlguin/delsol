import { Component, OnInit } from '@angular/core';
import { fade } from '../animations';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
  animations: [
    fade
  ],
})
export class ModulesComponent implements OnInit {

  constructor(private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.getAllStores();
  }

  editing = false;

  storesArray:any[] = [ ];

  /* ----------------------------- Obtener tiendas ---------------------------- */
  getAllStores = () => {
    this.firestore.getStores().subscribe( resp => {
      console.log("resp: ", resp);
      this.storesArray = resp;
      for (let i = 0; i < this.storesArray.length; i++) { this.storesArray[i].done = true; }
    });
  }

  /* ------------------------------ Editar tienda ----------------------------- */
  edit = (index:number) => {
    this.editing = true;
    this.storesArray[index].done = false;
  }
  cancelEdit = (index:number) => {
    this.storesArray[index].done = true;
    this.editing = false;
  }
  setData = (index:number, data:string[]) => {
    console.log("data: ", data);
    if(data[0] === '' || data[1] === '') { return }
    this.firestore.updateStore({
      id: this.storesArray[index].id,
      storeId: data[0],
      nombre: data[1],
      estado: this.storesArray[index].estado,
      ciudad: this.storesArray[index].ciudad,
    });
    this.editing = false;
  }

  /* ----------------------------- Eliminar tienda ---------------------------- */
  storeIndex = 0;
  dialog = false;

  deleteStore = (index:number) => {
    this.storeIndex = index;
    this.dialog = true;
  }
  //Proceder o cancelar
  proceedDelete = () => {
    const id = this.storesArray[this.storeIndex].idDoc;
    this.firestore.deleteStore(id);
    this.dialog = false;
  }
  cancelDelete = () => {
    this.storeIndex = 0;
    this.dialog = false;
  }



}
