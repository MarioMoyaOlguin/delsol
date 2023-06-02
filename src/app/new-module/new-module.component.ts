import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-module',
  templateUrl: './new-module.component.html',
  styleUrls: ['./new-module.component.scss']
})
export class NewModuleComponent implements OnInit {

  storeForm!:FormGroup;

  constructor(private router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.storeForm = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
    });
  }
  /* --------------------------------- Getters -------------------------------- */
  get getId() { return this.storeForm.get("id") }
  get getNombre() { return this.storeForm.get("nombre") }
  get getUbicacion() { return this.storeForm.get("ubicacion") }
  
  data:any[] = []

  newStore = () => {
    this.router.navigate(['/home'], {});
  }

}
