import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";

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
      email: '',
      password: ''
    });
    this.loginForm.valueChanges.subscribe(console.log);
  }

  empty = '';
  wrongData = '';

  validateField = (e:Event, data:string) => {
    e.preventDefault();
  }

  validateLogin = (e:Event, user:string, pass:string) => {
    e.preventDefault();
    
    if(user === '') console.log('vacio');
    if(pass === '') console.log('vacio');

    this.router.navigate(['/home'], {});
  }

}
