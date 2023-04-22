import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';

import { estadosCiudadesMexico } from './../data';

@Component({
  selector: 'app-new-store',
  templateUrl: './new-store.component.html',
  styleUrls: ['./new-store.component.scss']
})
export class NewStoreComponent implements OnInit {
  
  storeForm!:FormGroup;

  constructor(private router:Router, private fb:FormBuilder, private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.fillStatesCitiesArray();
    this.storeForm = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
    });
  }
  /* --------------------------------- Getters -------------------------------- */
  get getId() { return this.storeForm.get("id") }
  get getNombre() { return this.storeForm.get("nombre") }
  get getEstado() { return this.storeForm.get("estado") }
  get getCiudad() { return this.storeForm.get("ciudad") }
  
  
  /* ---------------------------- Registrar tienda ---------------------------- */
  newStore = () => {
    this.firestore.addStore({
      id: new Date().getTime().toString(),
      storeId: this.getId?.value,
      nombre: this.getNombre?.value,
      estado: this.getEstado?.value,
      ciudad: this.getCiudad?.value,
    });
  }

  /* ---------------------------- obtener ciudades ---------------------------- */
  getCities = (state:string) => {
    const stateIndex = this.states.indexOf(state)
    const stateCities = this.cities[stateIndex];
    this.tempCities = [];
    this.tempCities = [...stateCities];
  }

  /* ----------------------- Obtener estados y ciudades ----------------------- */
  states:any = [];
  cities:any = [];
  tempCities:any = [];

  fillStatesCitiesArray = () => {
    console.log(estadosCiudadesMexico);
    this.states = Object.keys(estadosCiudadesMexico);
    this.cities = Object.values(estadosCiudadesMexico);
  }

}
