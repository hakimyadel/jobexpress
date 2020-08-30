import { Component, OnInit } from '@angular/core';
import DataSnapshot = firebase.database.DataSnapshot;
import {DonneesService} from "../services/donnees.service";
import * as firebase from "firebase";

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {


  constructor(private donnee: DonneesService) { }

  ngOnInit(): void {
  }

  /*ajouter() {
    firebase.database().ref('/entreprises').push({nom: 'google', annonces: []})
  }

  lire() {
    firebase.database().ref('/annonces').child('/-MFrI7oXyVVp6MFtjHtK')
      .on('value', (data: DataSnapshot) => {
        console.log(data.val())
        }
      );
  }*/

}
