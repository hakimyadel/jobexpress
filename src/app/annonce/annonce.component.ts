import {Component, OnInit} from '@angular/core';
import {Annonce} from "../interfaces/annonce";
import {FirebaseAppService} from "../services/firebase-app.service";
import {Router} from "@angular/router";
import {experiences, niveaux} from "../interfaces/constantes";
import {Entreprise} from "../interfaces/entreprise";
import {Candidat} from "../interfaces/candidat";

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent implements OnInit {

  annonce: Annonce = {
    nom: '',
    poste: '',
    creation: null,
    diplome: null,
    niveau: null,
    experience: null,
    wilaya: '',
    telephone: '',
    description: '',
    image: '',
    confirm: 'attente',
    entreprise: null,
    domaine: null,
    idEntreprise: null,
    idAnnonce: null,
    candidats: []
  };
  entreprise: Entreprise;
  niveaux = niveaux;
  experiences = experiences;
  candidats: Candidat[] = [];


  constructor(public api: FirebaseAppService, private router: Router) {
    if (this.api.idAnnonce) {
      this.api.app.database().ref().child('annonce').child(this.api.idAnnonce)
        .once('value', (snapshot) => {
          this.annonce = snapshot.val();
        }).then(() =>{
        for (let key of this.annonce.candidats){
          this.api.app.database().ref().child('candidat').child(key)
            .once('value', (snap) => {
              this.candidats.push(snap.val())
            })
        }
      })
        .catch(function (error) {
        console.log(error);
      });
    }
  }

  ngOnInit(): void {
  }
  voirCandidat(event) {
    const userid = event.target.firstChild.textContent;
    this.api.idCand = userid;
    localStorage.setItem('candidat', userid);
    this.router.navigate(['candidat']);
  }
}
