import {Component, OnInit} from '@angular/core';
import {Candidat} from "../interfaces/candidat";
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
  experiences = experiences;
  confirmPassword: string;
  auth: boolean;

  constructor(private api: FirebaseAppService, private router: Router) {
    const that = this;
    this.auth = localStorage.getItem('user') === 'candidat';
    if (this.auth) {
      this.api.app.database().ref().child('candidat').child(localStorage.getItem('key'))
        .once('value', function (snapshot) {
          that.candidat = snapshot.val();
        }).catch(function (error) {
        console.log(error);
      });
    } else {
      this.candidat = {
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
    }
  }

  ngOnInit(): void {
  }

  creerCandidat() {
    let that = this;
    this.api.app.auth().createUserWithEmailAndPassword(this.candidat.email, this.candidat.password)
      .then(function (result) {
        const newKey = that.api.app.database().ref().child('/candidat').push().key;
        result.user.updateProfile({displayName: 'candidat', photoURL: newKey});
        that.candidat.userId = result.user.uid;
        that.api.app.database().ref().child('/candidat').child(newKey).set(that.candidat);
        result.user.sendEmailVerification().then(function () {
          alert('Un lien de vérification a été envoyé à votre boite email. Veuillez le confirmer pour pouvoir accéder à votre compte ')
          that.api.app.auth().signOut();
          that.router.navigate(['connexion'])
        }).catch(function (error) {
        });
      })
      .catch(function (error) {
        alert(error)
      });
  }

  uploadFile(event) {
    this.candidat.image = this.api.uploadFile(event);
  }

  updateProfile() {
    this.api.app.database().ref().child('/candidat')
      .child(this.api.idUser).set(this.candidat);
    this.router.navigate(['candidat'])
  }
}
