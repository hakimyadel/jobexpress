import {Injectable} from '@angular/core';
import {DonneesService} from "./donnees.service";

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  authentification : boolean;

  constructor(private donnee: DonneesService) {
    this.donnee.app.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.authentification = true;
        } else {
          this.authentification = false;
        }
      }
    );

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
