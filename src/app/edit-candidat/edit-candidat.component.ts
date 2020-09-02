import {Component, OnInit} from '@angular/core';
import {Candidat} from "../interfaces/candidat";
import {DonneesService} from "../services/donnees.service";
import {FirebaseAppService} from "../services/firebase-app.service";
import {Router} from "@angular/router";
import {wilayas, niveaux, experiences} from "../interfaces/constantes";


@Component({
  selector: 'app-edit-candidat',
  templateUrl: './edit-candidat.component.html',
  styleUrls: ['./edit-candidat.component.css']
})
export class EditCandidatComponent implements OnInit {
  candidat: Candidat;
  wilayas = wilayas;
  niveaux = niveaux;
  experiences = experiences
  confirmPassword: string;


  constructor(private donnee: DonneesService, private api: FirebaseAppService, private router: Router) {
    this.candidat = {
      nom: 'abi ayad',
      prenom: 'fethi',
      naissance: null,
      email: 'fethipharm010@gmail.com',
      password: 'qwerty',
      wilaya: null,
      telephone: '0555555555',
      diplome: 'pharmacien',
      niveau: null,
      experience: null,
      description: '',
      userId: null
    }
  }

  ngOnInit(): void {
  }

  creerCandidat() {
    let that = this;
    this.api.app.auth().createUserWithEmailAndPassword(this.candidat.email, this.candidat.password)
      .then(function (result) {
        result.user.updateProfile({displayName: 'candidat'});
        that.candidat.userId = result.user.uid;
        that.donnee.ajouterCandidat(that.candidat);
        result.user.sendEmailVerification().then(function () {
          console.log('email de verification envoyé')
          that.api.app.auth().signOut();
          that.router.navigate(['connexion'])
        }).catch(function (error) {
        });
      })
      .catch(function (error) {
        alert(error)
      });
  }

}
