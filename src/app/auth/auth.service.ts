import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor(private router: Router) { }

  signupuser(email: string, password: string) {
    console.log('sign up');

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(
      error => console.log(error)
    );
  }

  signinuser(email: string, password: string) {
    console.log('sign in');

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(
      response => {
        this.router.navigate(['/']);

        firebase.auth().currentUser.getIdToken()
        .then(
          (token: string) => this.token = token
        );
      }
    )
    .catch(
      error => console.log(error)
    );
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
    .then(
      (token: string) => this.token = token
    );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/']);
  }
}
