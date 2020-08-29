import { Component, OnInit } from '@angular/core';
import {Annonce} from "../interfaces/annonce";
import * as firebase from "firebase";
import DataSnapshot = firebase.database.DataSnapshot;
import {DonneesService} from "../services/donnees.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  annonce : any = {nom: 'poste de developpeur frontend' , niveau: 2 , domaine: 'informatique'};

  constructor(private donnee: DonneesService) { }

  ngOnInit(): void {
  }

  ajouter() {
    firebase.database().ref('/entreprises').push({nom: 'google', annonces: []})
  }

  lire() {
    firebase.database().ref('/annonces').child('/-MFrI7oXyVVp6MFtjHtK')
      .on('value', (data: DataSnapshot) => {
        console.log(data.val())
        }
      );
  }
  ecrire(){
    this.donnee.ajouterAnnonce('-MFsaFQfeZg-071URhUw');
  }
}
