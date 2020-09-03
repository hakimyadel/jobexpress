import {Injectable} from '@angular/core';
import {Annonce} from "../interfaces/annonce";
import {Entreprise} from "../interfaces/entreprise";
import {FirebaseAppService} from "./firebase-app.service";




@Injectable({
  providedIn: 'root'
})
export class DonneesService {


  constructor(private api : FirebaseAppService) {}

  ajouterEntreprise(entreprise: Entreprise){
    this.api.app.database().ref().child('/entreprises').push(entreprise);
  }

  ajouterAnnonce(annonce: Annonce, idEntreprise: string) {
    const newKey = this.api.app.database().ref().child('/annonces').push().key;
    this.api.app.database().ref().child('/annonces').child(newKey).set(annonce);
    this.api.app.database().ref().child('/entreprises').child(idEntreprise).child('annonces').push(newKey);
  }

}
