import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import * as firebase from "firebase";
import {Router} from "@angular/router";
import {DonneesService} from "./donnees.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router, private donnee: DonneesService) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        this.donnee.app.auth().onAuthStateChanged(
          (user) => {
            if(user) {
              resolve(true);
            } else {
              this.router.navigate(['/auth', 'signin']);
              resolve(false);
            }
          }
        );
      }
    );
  }

}
