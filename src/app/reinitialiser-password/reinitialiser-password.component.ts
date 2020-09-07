import { Component, OnInit } from '@angular/core';
import {FirebaseAppService} from "../services/firebase-app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reinitialiser-password',
  templateUrl: './reinitialiser-password.component.html',
  styleUrls: ['./reinitialiser-password.component.css']
})
export class ReinitialiserPasswordComponent implements OnInit {
  courriel = '';

  constructor(private api : FirebaseAppService, private router: Router) { }

  ngOnInit(): void {
  }

  reinitialiser() {
    this.api.app.auth().sendPasswordResetEmail(this.courriel).then(() => {
      alert("Un lien de réinitialisation de mot de passe a été envoyé à votre boite mail");
      this.router.navigate(['connexion']);
    }).catch((error) => {
      alert(error);
    });
  }
}
