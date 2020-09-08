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
    postule: [],
    image: 'assets/images/photoProfile.jpg',
    userId: null
  };
  wilayas = wilayas;
  niveaux = niveaux;
  experiences = experiences;
  confirmPassword: string;
  chargement = false;

  constructor(public api: FirebaseAppService, private router: Router) {
    const that = this;
    if (this.api.user === 'candidat') {
      this.api.app.database().ref().child('candidat').child(this.api.idCand)
        .once('value', function (snapshot) {
          that.candidat = snapshot.val();
        }).catch(function (error) {
        console.log(error);
      });
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
        that.candidat.userId = newKey;
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
    const file = event.target.files[0];
    const almostUniqueFileName = Date.now().toString();
    const upload = this.api.app.storage().ref()
      .child('images/' + almostUniqueFileName + file.name).put(file);
    upload.on('state_changed', (snapshot) => {
      this.chargement = true;
    }, (error) => {
      console.log(error)
    }, () => {
      upload.snapshot.ref.getDownloadURL().then( (downloadURL) => {
        this.candidat.image = downloadURL;
        this.chargement = false;
      });
    });
  }

  updateProfile() {
    this.api.app.database().ref().child('/candidat')
      .child(this.api.idCand).set(this.candidat);
    this.router.navigate(['candidat'])
  }
}
