import {Component, OnInit} from '@angular/core';
import {FirebaseAppService} from "../services/firebase-app.service";
import {Router} from "@angular/router";
import {Entreprise} from "../interfaces/entreprise";
import {Annonce} from "../interfaces/annonce";

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent implements OnInit {


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

  constructor(private api: FirebaseAppService, private router: Router) {
    const that = this;
    this.api.app.database().ref().child('entreprise').child(this.api.idUser)
      .on('value', function (snapshot) {
        that.entreprise = snapshot.val();
      });
  }

  ngOnInit(): void {
  }

  editerProfile() {
    this.router.navigate(['edit/entreprise']);
  }

  voirAnnonces() {
    this.router.navigate(['mesAnnonces']);
  }
}
