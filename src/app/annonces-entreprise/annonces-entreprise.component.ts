import {Component, OnInit} from '@angular/core';
import {experiences, niveaux} from "../interfaces/constantes";
import {Annonce} from "../interfaces/annonce";
import {FirebaseAppService} from "../services/firebase-app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-annonces-entreprise',
  templateUrl: './annonces-entreprise.component.html',
  styleUrls: ['./annonces-entreprise.component.css']
})
export class AnnoncesEntrepriseComponent implements OnInit {

  annonces: any[] = [];

  constructor(private api: FirebaseAppService, private router: Router) {
    this.api.app.database().ref('/annonce').orderByChild("idEntreprise")
      .equalTo(this.api.idUser).on("child_added",  (data) => {
      this.annonces.push(data.val());
    });
  }

  ngOnInit(): void {
  }

  AjouterAnnonce() {
    this.api.idAnnonce = null;
    localStorage.setItem('annonce', null);
    this.router.navigate(['edit/annonce']);
  }

  modifierAnnonce(event) {
    const annonce = event.target.parentNode.parentNode.lastChild.textContent;
    this.api.idAnnonce = annonce;
    localStorage.setItem('annonce', annonce);
    this.router.navigate(['edit/annonce']);
  }

  consulterAnnonce(event) {
    const annonce = event.target.parentNode.parentNode.lastChild.textContent;
    this.api.idAnnonce = annonce;
    localStorage.setItem('annonce', annonce);
    this.router.navigate(['annonce']);
  }

  supprimerAnnonce(event) {
    const ligne = event.target.parentElement.parentElement
    const cleAnnonce = ligne.lastChild.textContent;
    if (confirm("Voulez vous vraiment supprimer cette annonce ?")) {
      this.api.app.database().ref().child('annonce').child(cleAnnonce).remove();
      ligne.parentElement.parentElement.deleteRow(ligne.rowIndex);
    }
  }
}
