import { Component, OnInit } from '@angular/core';
import {FirebaseAppService} from "../services/firebase-app.service";
import {Router} from "@angular/router";
import {experiences, niveaux} from "../interfaces/constantes";
import {Entreprise} from "../interfaces/entreprise";

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent implements OnInit {

  niveaux = niveaux;
  experiences = experiences;
  entreprise: Entreprise = {
    nom: '',
    email: '',
    password: '',
    creation: null,
    domaine: '',
    wilaya: '',
    telephone: '',
    adresse: '',
    description: '',
    image: '',
    annonces : [],
    userId: null
  }

  constructor(private api: FirebaseAppService, private router: Router) {
    const that = this;
    this.api.app.database().ref().child('entreprise').child(localStorage.getItem('key'))
      .once('value',function (snapshot) {
        that.entreprise = snapshot.val();
      }).catch(function (error) {
      console.log(error);
    });
  }

  ngOnInit(): void {
  }

  editerProfile(){
    this.router.navigate(['edit/entreprise']);
  }

}
