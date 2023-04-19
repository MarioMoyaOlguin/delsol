import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-store',
  templateUrl: './new-store.component.html',
  styleUrls: ['./new-store.component.scss']
})
export class NewStoreComponent implements OnInit {
  
  storeForm!:FormGroup;

  constructor(private router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
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
  
  data:any[] = []

  newStore = () => {
    this.router.navigate(['/lista-modulos'], {});
  }

}
