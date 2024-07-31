import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { checkRole } from 'src/utils/checkRole';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  //admin auth gurd
  canActivate(): boolean {
    if (checkRole("ADMIN")) {
      return true;
    } else { // Redirect to login if not authenticated
      return false;
    }
  }
  
}
