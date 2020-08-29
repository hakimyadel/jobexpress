import {Injectable} from '@angular/core';
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  constructor() {
  }

  creerNouvelUtilisateur(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
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
        firebase.auth().signInWithEmailAndPassword(email, password).then(
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
    firebase.auth().signOut();
  }

}
