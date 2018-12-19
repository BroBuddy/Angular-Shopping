import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as AppReducers from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router,
              private store: Store<AppReducers.AppState>) { }

  signupuser(email: string, password: string) {
    console.log('sign up');

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
          user => {
            this.store.dispatch(new AuthActions.Signup());

            firebase.auth().currentUser.getIdToken()
              .then(
                  (token: string) => {
                      this.store.dispatch(new AuthActions.SetToken(token));
                  }
              );
          }
      )
      .catch(
        error => console.log(error)
      );
  }

  signinuser(email: string, password: string) {
    console.log('sign in');

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(
      response => {
        this.store.dispatch(new AuthActions.Signin());
        this.router.navigate(['/']);

        firebase.auth().currentUser.getIdToken()
        .then(
          (token: string) => {
            this.store.dispatch(new AuthActions.SetToken(token));
          }
        );
      }
    )
    .catch(
      error => console.log(error)
    );
  }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/']);
  }
}
