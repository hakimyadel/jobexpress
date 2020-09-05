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
    let that = this;
    this.api.app.auth().createUserWithEmailAndPassword(this.entreprise.email, this.entreprise.password)
      .then(function (result) {
        const newKey = that.api.app.database().ref().child('/entreprise').push().key;
        result.user.updateProfile({displayName: 'entreprise', photoURL: newKey});
        that.entreprise.userId = result.user.uid;
        that.api.app.database().ref().child('/entreprise').child(newKey).set(that.entreprise);
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
    this.entreprise.image = this.api.uploadFile(event);
  }

  updateProfile() {
    this.api.app.database().ref().child('/entreprise')
      .child(this.api.idUser).set(this.entreprise);
    this.router.navigate(['entreprise'])
  }

}
