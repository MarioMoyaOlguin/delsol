import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { estadosCiudadesMexico } from './../data';

@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.scss']
})
export class NewPollComponent implements OnInit {

  pollForm!:FormGroup;

  constructor(private router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.fillStatesCitiesArray();
    this.pollForm = this.fb.group({
      titulo: ['', [Validators.required]],
      tienda: ['', [Validators.required, Validators.pattern('[^ ]')]],
      filtro: ['', [Validators.required]],
      tiempo: ['']
    });
  }
  /* --------------------------------- Getters -------------------------------- */
  get getTitulo() { return this.pollForm.get("titulo") }
  get getTienda() { return this.pollForm.get("tienda") }

  /* -------------------------------- Variables ------------------------------- */
  states:any = [] //Array de estados de la republica
  cities:any = [] //Array de 2 dimensiones con las ciudades de cada estado en la respectiva posicion del states array
  selectedStates:string[] = []; //Estados seleccionados
  selectedCities:string[] = []; //Ciudades seleccionadas
  refStates:any = [] //Contiene todos los estados para referencia
  refCities:any = [] //Contiene todos las ciudades para referencia

  tempCities:any = []; //Array temporal de ciudades

  newPoll = () => {
    this.router.navigate(['/crear-encuesta'], {});
  }

  /* ----------------------------- Agregar estado ----------------------------- */
  addState = (state:string) => {
    this.selectedStates.push(state);
    let index = 0;
    for (let i = 0; i < this.states.length; i++) {
      if(this.states[i] === state) {
        index = i;
        break;
      }
    }
    this.states.splice(index, 1);
    this.tempCities = [];
    // remover ciudades de estados seleccionados
    const tempStateCities:any = [];
    const tempIndexes:any = [];
    console.log("this.selectedStates: ", this.selectedStates);
    console.log("this.states: ", this.states);
    for (let i = 0; i < this.selectedStates.length; i++) {
      for (let j = 0; j < this.refStates.length; j++) {
        if(this.selectedStates[i] == this.refStates[j]) {
          tempIndexes.push(j);
        }
      }
    }
    console.log("tempIndexes: ", tempIndexes);
    for (let i = 0; i < tempIndexes.length; i++) {
      tempStateCities.push(this.refCities[tempIndexes[i]])
    }
    console.log("tempStateCities: ", tempStateCities);
    const toDeleteIndexes = [];
    for (let i = 0; i < this.selectedCities.length; i++) {
      if(tempStateCities.indexOf(this.selectedCities[i])) {
        console.log('positive');
        toDeleteIndexes.push(i);
      }
    }
    for (let i = 0; i < toDeleteIndexes.length; i++) {
      this.selectedCities.splice(toDeleteIndexes[i], 1);
    }

  }
  /* ----------------------------- Remover estado ----------------------------- */
  removeState = (state:string) => {
    this.states.push(state);
    let index = 0;
    for (let i = 0; i < this.selectedStates.length; i++) {
      if(this.selectedStates[i] === state) {
        index = i;
        break;
      }
    }
    this.selectedStates.splice(index, 1);
  }

  /* ------------------- Obtener array temporal de ciudades ------------------- */
  getTempCities = (state:string) => {
    console.log("state: ", state);
    let stateIndex = 0;
    for (let i = 0; i < this.states.length; i++) {
      if(this.states[i] == state) {
        stateIndex = i;
        break;
      }
    }
    this.tempCities = [];
    this.tempCities = this.cities[stateIndex];
  }

  /* ----------------------------- Agregar ciudad ----------------------------- */
  addCity = (selectedCity:string, state:string) => {
    console.log("state: ", state);
    console.log("selectedCity: ", selectedCity);
    this.selectedCities.push(selectedCity);
  }
  /* ----------------------------- Remover ciudad ----------------------------- */
  removeCity = (city:string, state:string) => {
    console.log("city: ", city);

  }


  /* ----------------------------- Obtener Estados ---------------------------- */
  fillStatesCitiesArray = () => {
    console.log(estadosCiudadesMexico);
    this.states = Object.keys(estadosCiudadesMexico);
    this.cities = Object.values(estadosCiudadesMexico);
    this.refStates = Object.keys(estadosCiudadesMexico);
    this.refCities = Object.values(estadosCiudadesMexico);
  }
    
}
