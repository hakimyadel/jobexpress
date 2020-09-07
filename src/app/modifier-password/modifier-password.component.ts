import { Component, OnInit } from '@angular/core';
import {FirebaseAppService} from "../services/firebase-app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-modifier-password',
  templateUrl: './modifier-password.component.html',
  styleUrls: ['./modifier-password.component.css']
})
export class ModifierPasswordComponent implements OnInit {

  motDePasse: string;
  courriel: string;
  oldPassword = '';
  newPassword = '';
  confirmPassword = '';

  constructor(private api : FirebaseAppService, private router: Router) {
    if(this.api.user === 'candidat'){
       this.api.app.database().ref('candidat').child(this.api.idCand)
        .once('value', snap => {
          this.motDePasse = snap.val().password;
          this.courriel = snap.val().email;
        } );
    } else if (this.api.user === 'entreprise'){
      this.api.app.database().ref('entreprise').child(this.api.idEnt)
        .once('value', snap => {
          this.motDePasse = snap.val().password;
          this.courriel = snap.val().email;
        } );
    }
  }

  ngOnInit(): void {
  }

  modifierPassword() {
    this.api.app.auth().signInWithEmailAndPassword(this.courriel, this.motDePasse).then( result => {
      const user = result.user;
      user.updatePassword(this.newPassword).then(() => {
        alert('Votre mot de passe a bien été modifié');
        this.api.app.auth().signOut();
        if(this.api.user === 'candidat'){
          this.api.app.database().ref('candidat').child(this.api.idCand)
            .child('password').set(this.newPassword);
          this.router.navigate(['candidat'])
        } else if (this.api.user === 'entreprise') {
          this.api.app.database().ref('entreprise').child(this.api.idEnt)
            .child('password').set(this.newPassword);
          this.router.navigate(['entreprise'])
        }
      }).catch(error => alert(error))
    }).catch(error => alert(error))
  }
}
