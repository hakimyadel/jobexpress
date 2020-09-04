import {Component, OnInit} from '@angular/core';
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
  candidat: Candidat = {
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

  constructor(private api: FirebaseAppService, private router: Router) {
    const that = this;
    this.api.app.database().ref().child('candidat').child(localStorage.getItem('key'))
      .once('value',function (snapshot) {
      that.candidat = snapshot.val();
    }).catch(function (error) {
      console.log(error);
    });
  }

  ngOnInit(): void {}

  editerProfile(){
    this.router.navigate(['edit/candidat']);
  }
}
