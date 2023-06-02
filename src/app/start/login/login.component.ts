import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from 'src/app/services/login.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { fade } from 'src/app/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    fade
  ],
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup = this.fb.group({});

  constructor(private router:Router, private fb:FormBuilder, public loginUser:LoginService, private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      // email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  get getEmail() { return this.loginForm.get("email") }
  get getUser() { return this.loginForm.get("usuario") }
  get getPassword() { return this.loginForm.get("password") }

  validateField = (e:Event, data:string) => {
    e.preventDefault();
  }

  /* ---------------------------------- Login --------------------------------- */
  error = false;

  submitForm = (e:Event) => {
    e.preventDefault();

    if(this.loginForm.invalid) { return }
    const user = { user: this.getUser!.value, password: this.getPassword!.value };
    console.log("user: ", user);

    this.firestore.userLogin(user.user).subscribe( resp => {
      console.log("resp: ", resp);
      const foundUser = resp[0];

      if(resp.length > 0 ) {
        if(user.password === foundUser['contraseña']) {
          this.loginUser.setToken(foundUser['idDoc']);
          this.router.navigate(['/home'], {});
        }
        else { this.error = true; }
      }
      else {
        this.error = true;
      }

    });

    // this.loginUser.login(user)
    // .subscribe( data => {
    //   console.log(data);
    //     this.loginUser.setToken(data.token);
    //     if(data.user === 'normal') {
    //       this.router.navigate(['/mis-encuestas'], {});
    //     }
    //     else {
    //       this.router.navigate(['/home'], {});
    //     }
    //   })
  }

  resetError = () => this.error = false;

}
