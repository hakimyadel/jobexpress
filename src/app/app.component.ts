import {Component} from '@angular/core';
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAWjyzdfj7EBsHK3CPDu8R2dG3O6CLzjew",
  authDomain: "jobexpress008.firebaseapp.com",
  databaseURL: "https://jobexpress008.firebaseio.com",
  projectId: "jobexpress008",
  storageBucket: "jobexpress008.appspot.com",
  messagingSenderId: "396787710433",
  appId: "1:396787710433:web:08cb6c612e69bb1c0c7aa0"
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

}
