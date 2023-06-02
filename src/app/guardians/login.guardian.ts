import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';

import { LoginService } from "src/app/services/login.service";
import { Injectable } from '@angular/core';

@Injectable()


export class LoginGuardian implements CanActivate {

    constructor(private loginService:LoginService, private router:Router) {}

    canActivate( route:ActivatedRouteSnapshot, state:RouterStateSnapshot ) {
        if(this.loginService.isLogedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/']);
            return false;
        }
    }
}