import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  result!: boolean
  form!:NgForm
  constructor(private route:Router){

  }
    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {     
    if(localStorage.getItem('token')){
      return true;
    }     
    this.route.navigate(['/login']);
    return false;
  }
  
}
