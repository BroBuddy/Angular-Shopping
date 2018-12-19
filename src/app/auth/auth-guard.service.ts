import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as AppReducers from '../store/app.reducers';
import * as AuthReducers from './store/auth.reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private store: Store<AppReducers.AppState>,
              private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, stage: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      const isAuthenticated = this.store.select('auth').pipe(
          map((authState: AuthReducers.State) => {
          return authState.authenticated;
        })
      );

      if (!isAuthenticated) {
        this.router.navigate(['/']);
      }

      return isAuthenticated;
    }
}
