import { Component, OnInit } from '@angular/core';
import {Annonce} from "../interfaces/annonce";
import {domaines, experiences, niveaux, wilayas} from "../interfaces/constantes";
import {FirebaseAppService} from "../services/firebase-app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {

  data: Annonce[] = [];
  annonces : Annonce[] = [];
  wilayas = wilayas;
  niveaux = niveaux;
  experiences = experiences;
  domaines = domaines;

  wilayaRech = 'tous';
  niveauRech = 'tous';
  experienceRech = 'tous';
  domaineRech = 'tous';
  texteRech = '';
  postule = false;

  constructor(private api: FirebaseAppService, private router: Router) {
    this.api.app.database().ref('/annonce').orderByChild("confirm")
      .equalTo('accepte').on("child_added", (data) => {
      this.data.push(data.val());
      if(data.val().candidats == null|| !data.val().candidats.includes(this.api.idCand)){
        this.annonces.push(data.val());
      }
    })
  }

  ngOnInit(): void {
  }

  recherche(){
    this.postule = false;
    this.annonces = this.data.filter(a =>
      a.candidats == null || !a.candidats.includes(this.api.idCand)
    );
    this.annonces = this.annonces.filter(a =>
      a.nom.includes(this.texteRech)
      || a .poste.includes(this.texteRech)
      || a.diplome.includes(this.texteRech)
      || a.description.includes(this.texteRech)
      || a.entreprise.includes(this.texteRech)
    );
    if(this.wilayaRech != 'tous'){
      this.annonces = this.annonces.filter(a =>
        a.wilaya === this.wilayaRech)
    }
    if(this.domaineRech != 'tous'){
      this.annonces = this.annonces.filter(a =>
        a.domaine === this.domaineRech)
    }
    if(this.niveauRech != 'tous'){
      this.annonces = this.annonces.filter(a =>
        a.niveau >= parseInt(this.niveauRech))
    }
    if(this.experienceRech != 'tous'){
      this.annonces = this.annonces.filter(a =>
        a.experience >= parseInt(this.experienceRech))
    }
  }

  chargerPostuleCandidat(){
    this.postule = true;
    this.annonces = this.data.filter(a =>
      a.candidats != null && a.candidats.includes(this.api.idCand)
    );
  }

  detailEntreprise(event) {
    const cleEntreprise = event.target.firstChild.textContent;
    this.api.idEnt = cleEntreprise;
    localStorage.setItem('entreprie' , cleEntreprise);
    this.router.navigate(['entreprise']);

  }

  postuler(event) {
    let candidats ;
    const cleAnnonce = event.target.firstChild.textContent;
    this.api.app.database().ref('/annonce').child(cleAnnonce).child('candidats')
      .once("value", (data) => {
      candidats = data.val();
      if(candidats == null){
        candidats =[];
      }
      candidats.push(this.api.idCand);
      this.api.app.database().ref().child('annonce').child(cleAnnonce)
          .child('candidats').set(candidats);
        alert('Votre candidature a bien été envoyée');
        this.router.navigate(['candidat']);
    })
  }
}
