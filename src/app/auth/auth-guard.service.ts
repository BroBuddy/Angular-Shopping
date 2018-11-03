import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, stage: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      const isAuthenticated = this.authService.isAuthenticated();

      if (!isAuthenticated) {
        this.router.navigate(['/']);
      }

      return isAuthenticated;
    }
}
