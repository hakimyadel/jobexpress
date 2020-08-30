import {Injectable} from '@angular/core';
import {Annonce} from "../interfaces/annonce";
import * as firebase from "firebase";
import {Candidat} from "../interfaces/candidat";
import {Entreprise} from "../interfaces/entreprise";

const firebaseConfig = {
  apiKey: "AIzaSyAWjyzdfj7EBsHK3CPDu8R2dG3O6CLzjew",
  authDomain: "jobexpress008.firebaseapp.com",
  databaseURL: "https://jobexpress008.firebaseio.com",
  projectId: "jobexpress008",
  storageBucket: "jobexpress008.appspot.com",
  messagingSenderId: "396787710433",
  appId: "1:396787710433:web:08cb6c612e69bb1c0c7aa0"
};


@Injectable({
  providedIn: 'root'
})
export class DonneesService {
  app: firebase.app.App;

  constructor() {
    this.app= firebase.initializeApp(firebaseConfig);
  }

  ajouterEntreprise(entreprise: Entreprise){
    this.app.database().ref().child('/entreprises').push(entreprise);
  }

  ajouterAnnonce(annonce: Annonce, idEntreprise: string) {
    const newKey = this.app.database().ref().child('/annonces').push().key;
    this.app.database().ref().child('/annonces').child(newKey).set(annonce);
    this.app.database().ref().child('/entreprises').child(idEntreprise).child('annonces').push(newKey);
  }

  ajouterCandidat(candidat: Candidat) {
    this.app.database().ref().child('/candidats').push(candidat);
  }



}
