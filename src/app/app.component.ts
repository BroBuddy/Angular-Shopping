import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    const config = {
      apiKey: "AIzaSyDEQrpi3IMaM-Omv4vYAVk9leJPr8_vJJE",
      authDomain: "angular-shopping-8bce0.firebaseapp.com"
    };

    firebase.initializeApp(config);
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
