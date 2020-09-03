import { Component, OnInit } from '@angular/core';
import {FirebaseAppService} from "../services/firebase-app.service";
import {Candidat} from "../interfaces/candidat";
import {Router} from "@angular/router";
import {experiences, niveaux} from "../interfaces/constantes";

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent implements OnInit {


  niveaux = niveaux
  experiences = experiences
  candidat : Candidat = {
  nom: '',
  prenom: '',
  naissance: null,
  email: '',
  password: '',
  wilaya: null,
  telephone: '',
  diplome: '',
  niveau: null,
  experience: null,
  description: '',
  image: 'assets/images/photoProfile.jpg',
  userId: null
}

  constructor(private api : FirebaseAppService, private router: Router) {
    let that = this;
    let cle = this.api.app.auth().currentUser.photoURL;
    console.log(cle);
    this.api.app.database().ref().child('candidat').child(cle).on('value', function (snapshot) {
      console.log(snapshot.val());
      that.candidat = snapshot.val();
    })
  }

  ngOnInit(): void {

  }

  seDeconnecter() {
    this.api.app.auth().signOut();
    this.router.navigate(['connexion']);
  }
}
