import {Component, OnInit} from '@angular/core';
import {ConnexionService} from "../services/connexion.service";
import {DonneesService} from "../services/donnees.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  email: string;
  password: string;

  constructor(private connexion: ConnexionService, private donnee: DonneesService ,private router : Router) {
    this.email = '';
    this.password = '';

  }

  ngOnInit(): void {
  }

  seConnecter() {
    this.connexion.connecterUtilisateur(this.email, this.password);
    if(this.connexion.authentification){
      this.router.navigate(['candidat']);
    } else{
      alert('le mot de passe est incorrect');
    }
  }

  seDeconnecter() {
    this.connexion.deconnecterUtilisateur();
  }
}
