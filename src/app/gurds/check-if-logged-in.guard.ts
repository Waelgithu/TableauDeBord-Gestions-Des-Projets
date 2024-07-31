import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { doesTheUserLoggedIn } from 'src/utils/doesTheUserLoggedIn';

@Injectable({
  providedIn: 'root'
})
export class CheckIfLoggedInGuard implements CanActivate {
  canActivate(): boolean {
    if (doesTheUserLoggedIn()) {
      return true;
    } else { // Redirect to login if not authenticated
      return false;
    }
  }
  
}
