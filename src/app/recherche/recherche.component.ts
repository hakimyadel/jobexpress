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
  annonces : Annonce[];
  wilayas = wilayas;
  niveaux = niveaux;
  experiences = experiences;
  domaines = domaines;

  wilayaRech = 'tous';
  niveauRech = 'tous';
  experienceRech = 'tous';
  domaineRech = 'tous';
  texteRech = '';

  constructor(private api: FirebaseAppService, private router: Router) {
    this.api.app.database().ref('/annonce').orderByChild("confirm")
      .equalTo('accepte').on("child_added", (data) => {
      this.data.push(data.val());
    })
  }

  ngOnInit(): void {
  }

  recherche(){
    this.annonces = this.data.filter(a =>
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

  detailAnnonce(event) {
    const cleAnnonce = event.target.firstChild.textContent;
    this.api.idAnnonce = cleAnnonce;
    localStorage.setItem('annonce' , cleAnnonce);
    this.router.navigate(['annonce']);
  }

  detailEntreprise(event) {
    const cleEntreprise = event.target.firstChild.textContent;
    this.api.idEnt = cleEntreprise;
    localStorage.setItem('entreprie' , cleEntreprise);
    this.router.navigate(['entreprise']);

  }
}
