import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';

import { LoginService } from "src/app/services/login.service";
import { Injectable } from '@angular/core';

@Injectable()


export class AdminSuperadminGuardian implements CanActivate {

    constructor(private loginService:LoginService, private router:Router) {}

    canActivate( route:ActivatedRouteSnapshot, state:RouterStateSnapshot ) {
        if(this.loginService.isAdminOrSuperadmin()) {
            return true;
        }
        else {
            if(this.loginService.isLogedIn()) {
                this.router.navigate(['/home']);
                return false;
            } else {
                this.router.navigate(['/']);
                return false;
            }
        }
    }
}