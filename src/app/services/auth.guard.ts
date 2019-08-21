import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,
     RouterStateSnapshot } from '@angular/router';
import { authService } from './auth.service';



@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: authService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.isLoggedIn();
        if (currentUser) {
            // authorised so return true
            
            return true;
        }

        // not logged in so redirect to login page 
        this.router.navigate(['users/login']);
        return false;
    }
}