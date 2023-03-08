import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup = this.fb.group({});

  constructor(private router:Router, private fb:FormBuilder, public loginUser:LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  get getEmail() { return this.loginForm.get("email") }
  get getPassword() { return this.loginForm.get("password") }

  validateField = (e:Event, data:string) => {
    e.preventDefault();
  }

  submitForm = (e:Event) => {
    e.preventDefault();

    if(this.loginForm.invalid) { return }

    const user = { email: this.getEmail!.value, password: this.getPassword!.value };

    this.loginUser.login(user)
    .subscribe( data => {
      console.log(data);
        this.loginUser.setToken(data.token);
        if(data.user === 'normal') {
          this.router.navigate(['/mis-encuestas'], {});
        }
        else {
          this.router.navigate(['/home'], {});
        }
      })
  }

}
