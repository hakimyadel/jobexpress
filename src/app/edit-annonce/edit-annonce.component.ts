import {Component, OnInit} from '@angular/core';
import {Annonce} from "../interfaces/annonce";
import {FirebaseAppService} from "../services/firebase-app.service";
import {Router} from "@angular/router";
import {wilayas, niveaux, experiences,domaines} from "../interfaces/constantes";
import {Candidat} from "../interfaces/candidat";


@Component({
  selector: 'app-edit-annonce',
  templateUrl: './edit-annonce.component.html',
  styleUrls: ['./edit-annonce.component.css']
})
export class EditAnnonceComponent implements OnInit {
annonce : Annonce;
  candidat: Candidat;
  wilayas = wilayas;
  niveaux = niveaux;
  experiences = experiences;
  domaines = domaines ;

  constructor(private api: FirebaseAppService, private router: Router) { }

  ngOnInit(): void {
  }

}
