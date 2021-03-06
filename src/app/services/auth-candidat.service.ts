import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {FirebaseAppService} from "./firebase-app.service";

@Injectable({
  providedIn: 'root'
})
export class AuthCandidatService {

  constructor(private router: Router, private api: FirebaseAppService) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        if (this.api.user === 'candidat') {
          resolve(true);
        } else {
          this.router.navigate(['connexion']);
          resolve(false);
        }
      }
    );
  }
}
