import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup = this.fb.group({});

  constructor(private router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.loginForm.valueChanges.subscribe(console.log);
  }
  get getEmail() { return this.loginForm.get("email") }
  get getPassword() { return this.loginForm.get("password") }

  validateField = (e:Event, data:string) => {
    e.preventDefault();
  }

  validateLogin = (e:Event, user:string, pass:string) => {
    e.preventDefault();

    this.router.navigate(['/home'], {});
  }

}
