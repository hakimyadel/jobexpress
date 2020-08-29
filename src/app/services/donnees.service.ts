import {Injectable} from '@angular/core';
import {Annonce} from "../interfaces/annonce";
import * as firebase from "firebase";
import {Candidat} from "../interfaces/candidat";
import {Entreprise} from "../interfaces/entreprise";

const reference = firebase.database().ref()

@Injectable({
  providedIn: 'root'
})
export class DonneesService {

  constructor() {
  }

  ajouterEntreprise(entreprise: Entreprise){
    reference.child('/entreprises').push(entreprise);
  }

  ajouterAnnonce(annonce: Annonce, idEntreprise: string) {
    const newKey = reference.child('/annonces').push().key;
    reference.child('/annonces').child(newKey).set(annonce);
    reference.child('/entreprises').child(idEntreprise).child('annonces').push(newKey);
  }

  ajouterCandidat(candidat: Candidat) {
    reference.child('/candidats').push(candidat);
  }



}
