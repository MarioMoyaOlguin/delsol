import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private cookies: CookieService,private router:Router) {}

  login(user:any): Observable<any> {
    return this.http.post("https://reqres.in/api/login", user);
  }

  setToken(token:string) { this.cookies.set("token", token) }

  getToken() { return this.cookies.get("token") }

  logout = () => {
    this.cookies.set("token", '');
    this.router.navigate(['/']);
  }

  isLogedIn = () => { return this.cookies.get("token") }
}
