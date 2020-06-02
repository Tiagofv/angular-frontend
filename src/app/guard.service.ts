

import { Injectable } from '@angular/core';
import { CanActivate,CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService }      from './login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate, CanActivateChild{

  constructor(private LoginService: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(this.LoginService.auth){
      return true;
    }
    this.router.navigate["/"];
    return false;
  }

   canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(this.LoginService.auth){
      return true;
    }
    this.router.navigate["/"];
    return false;
  }
}
