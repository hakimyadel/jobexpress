import { Component, OnInit } from '@angular/core';
import {Annonce} from "../interfaces/annonce";
import {FirebaseAppService} from "../services/firebase-app.service";
import {Router} from "@angular/router";
import {experiences, niveaux} from "../interfaces/constantes";
import {Entreprise} from "../interfaces/entreprise";

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent implements OnInit {

  annonce: Annonce = {
    nom: '',
    creation: null,
    diplome: null,
    niveau: null,
    experience: null,
    wilaya: '',
    telephone: '',
    description: '',
    image: '',
    confirm: 'attente',
    idEntreprise: null,
    candidats: []
  };
  entreprise : Entreprise;
  niveaux = niveaux;
  experiences = experiences;


  constructor(public api: FirebaseAppService, private router: Router) {
    const that = this;
    if (this.api.idAnnonce) {
      this.api.app.database().ref().child('annonce').child(this.api.idAnnonce)
        .once('value', function (snapshot) {
          that.annonce = snapshot.val();
        }).catch(function (error) {
        console.log(error);
      });
      this.api.app.database().ref().child('entreprise').child(this.api.idUser)
        .once('value', function (snapshot) {
          that.entreprise = snapshot.val();
        }).catch(function (error) {
        console.log(error);
      });


    }
  }

  ngOnInit(): void {
  }

}
