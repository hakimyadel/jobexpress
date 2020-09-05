import {Component, OnInit} from '@angular/core';
import {Annonce} from "../interfaces/annonce";
import {FirebaseAppService} from "../services/firebase-app.service";
import {Router} from "@angular/router";
import {wilayas, niveaux, experiences, domaines, diplomes} from "../interfaces/constantes";


@Component({
  selector: 'app-edit-annonce',
  templateUrl: './edit-annonce.component.html',
  styleUrls: ['./edit-annonce.component.css']
})
export class EditAnnonceComponent implements OnInit {
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
  wilayas = wilayas;
  niveaux = niveaux;
  diplomes = diplomes;
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
    }
  }

  ngOnInit(): void {
  }

  creerAnnonce() {
    const newKey = this.api.app.database().ref().child('/annonce').push().key;
    this.api.app.database().ref().child('/entreprise').child(this.api.idUser)
      .child('annonces').push(newKey);
    this.annonce.idEntreprise = this.api.idUser;
    this.annonce.creation = new Date();
    this.api.app.database().ref().child('/annonce').child(newKey).set(this.annonce);
    this.router.navigate(['entreprise'])
  }

  uploadFile(event) {
    this.annonce.image = this.api.uploadFile(event);
  }

  updateProfile() {
    this.api.app.database().ref().child('/annonce')
      .child(this.api.idAnnonce).set(this.annonce);
    this.router.navigate(['entreprise'])
  }

}
