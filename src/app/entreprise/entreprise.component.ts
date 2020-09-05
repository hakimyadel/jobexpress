import {Component, OnInit} from '@angular/core';
import {FirebaseAppService} from "../services/firebase-app.service";
import {Router} from "@angular/router";
import {experiences, niveaux} from "../interfaces/constantes";
import {Entreprise} from "../interfaces/entreprise";
import {Annonce} from "../interfaces/annonce";

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
    annonces: [],
    userId: null
  }

  annonces : Annonce[] = [];

  constructor(private api: FirebaseAppService, private router: Router) {
    const that = this;
    this.api.app.database().ref().child('entreprise').child(this.api.idUser)
      .on('value', function (snapshot) {
        that.entreprise = snapshot.val();
        that.api.app.database().ref('/annonce').orderByChild("idEntreprise")
          .equalTo(that.api.idUser).on("child_added", function(data) {
          that.annonces.push(data.val());
        });
      });
  }

  ngOnInit(): void {
  }

  editerProfile() {
    this.router.navigate(['edit/entreprise']);
  }

  AjouterAnnonce() {
    this.router.navigate(['edit/annonce']);
  }

  modifierAnnonce(event) {
    const annonce = event.target.parentNode.parentNode.lastChild.textContent;
    this.api.idAnnonce = annonce;
    localStorage.setItem('annonce' , annonce);
    this.router.navigate(['edit/annonce']);
  }

  consulterAnnonce(event) {
    const annonce = event.target.parentNode.parentNode.lastChild.textContent;
    this.api.idAnnonce = annonce;
    localStorage.setItem('annonce' , annonce);
    this.router.navigate(['annonce']);
  }
}
