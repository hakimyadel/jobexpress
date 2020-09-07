import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {FirebaseAppService} from "./firebase-app.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {

  constructor(private router: Router, private api: FirebaseAppService) {
  }


  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        if (this.api.user === 'admin') {
          resolve(true);
        } else {
          this.router.navigate(['connexion']);
          resolve(false);
        }
      }
    );
  }
}
