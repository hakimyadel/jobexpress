import { Component, OnInit } from '@angular/core';
import {Candidat} from "../interfaces/candidat";
import {DonneesService} from "../services/donnees.service";

@Component({
  selector: 'app-edit-candidat',
  templateUrl: './edit-candidat.component.html',
  styleUrls: ['./edit-candidat.component.css']
})
export class EditCandidatComponent implements OnInit {
  candidat: Candidat;

  constructor(private donnee : DonneesService) {
    this.candidat = {
      nom: '',
      prenom: '',
      age: null,
      email : '',
      password: '',
      wilaya: '',
      telephone: '',
      diplome: '',
      niveau : null,
      experience: null,
      description: ''
    }
  }

  ngOnInit(): void {
  }

  creerCandidat() {
    this.donnee.ajouterCandidat(this.candidat);
  }
}
