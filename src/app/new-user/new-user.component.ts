import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  newUserForm!:FormGroup;

  constructor(private router:Router, private fb:FormBuilder, private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.newUserForm = this.fb.group({
      nombre: ['', [Validators.required]],
      // correo: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      // puesto: ['', [Validators.required]],
      // contraseña: ['', [Validators.required, Validators.minLength(6)]],
      // confirmar: ['', [Validators.required]],
      tienda: ['', [Validators.required]],
      tipoUsuario: ['', [Validators.required]]
    },{
      // validators:this.MustMatch("contraseña", "confirmar")
    });
    
  }
  get f() { return this.newUserForm.controls;}
  get getNombre() { return this.newUserForm.get("nombre") }
  // get getCorreo() { return this.newUserForm.get("correo") }
  // get getContrasena() { return this.newUserForm.get("contraseña") }
  // get getConfirmar() { return this.newUserForm.get("confirmar") }
  get getTienda() { return this.newUserForm.get("tienda") }
  get getPuesto() { return this.newUserForm.get("puesto") }
  get getTipoUsuario() { return this.newUserForm.get("tipoUsuario") }
  
  data:any[] = []

  // MustMatch = (pass:string, match:string) => {
  //   return (formGroup:FormGroup) => {
  //     const passwordControl = formGroup.controls[pass];
  //     const confirmPasswordControl = formGroup.controls[match];

  //     if(confirmPasswordControl.errors && !confirmPasswordControl.errors['MustMatch']) {
  //       return;
  //     }
  //     if(passwordControl.value !== confirmPasswordControl.value) {
  //       confirmPasswordControl.setErrors({MustMatch: true});
        
  //     } else {
  //       confirmPasswordControl.setErrors(null);
  //     }
  //   }
  // }

  newUser = () => {
    this.firestore.addUser({
      id: new Date().getTime().toString(),
      nombre: this.getNombre?.value,
      tipo: this.getTipoUsuario?.value,
      tienda: this.getTienda?.value
    })
    
  }

}
