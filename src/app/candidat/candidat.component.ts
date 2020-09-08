import {Component, OnInit} from '@angular/core';
import {FirebaseAppService} from "../services/firebase-app.service";
import {Candidat} from "../interfaces/candidat";
import {Router} from "@angular/router";
import {experiences, niveaux} from "../interfaces/constantes";
import {Annonce} from "../interfaces/annonce";

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
    postule: [],
    image: 'assets/images/photoProfile.jpg',
    userId: null
  }

  constructor(public api: FirebaseAppService, private router: Router) {
    const that = this;
    this.api.app.database().ref().child('candidat').child(this.api.idCand)
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

  modifierPasword() {
    this.router.navigate(['edit/password']);
  }

  supprimerProfile() {
    let candidats: string[];
    if (confirm("Voulez vous vraiment supprimer votre profile ?")) {
      this.api.app.database().ref('/annonce').on("child_added",  (data) => {
        candidats = data.val().candidats;
        candidats = candidats.filter(id => id != this.api.idCand);
        this.api.app.database().ref().child('annonce').child(data.val().idAnnonce)
          .child('candidats').set(candidats);
      });
      this.api.app.database().ref().child('candidat').child(this.api.idCand).remove();
      this.api.app.auth().signInWithEmailAndPassword(this.candidat.email, this.candidat.password).then( result => {
        this.api.app.database().ref().child('candidat').child(this.api.idCand).remove();
        result.user.delete().then(()=>{
          alert('Votre profil a bien été supprimé');
          localStorage.setItem('user', null);
          localStorage.setItem('entreprise', null);
          localStorage.setItem('candidat', null);
          localStorage.setItem('annonce', null);
          this.api.user = null;
          this.api.idEnt = null;
          this.api.idCand = null;
          this.api.idAnnonce = null;
          this.router.navigate(['accueil']);
        }).catch(error => alert(error))
      }).catch(error => alert(error))
    }
  }
}
