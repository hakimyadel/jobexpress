import {Injectable} from '@angular/core';
import * as firebase from "firebase";
import {DonneesService} from "./donnees.service";

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  constructor(private donnee: DonneesService) {
  }

  creerNouvelUtilisateur(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
         this.donnee.app.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  connecterUtilisateur(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        this.donnee.app.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  deconnecterUtilisateur() {
    this.donnee.app.auth().signOut();
  }

}
