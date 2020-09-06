import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FirebaseAppService} from "../services/firebase-app.service";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  email: string;
  password: string;

  constructor(private api: FirebaseAppService, private router: Router) {
    this.email = '';
    this.password = '';
  }

  ngOnInit(): void {
  }

  seConnecter() {
    let that = this;
    this.api.app.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(function (result) {
        let user = result.user
        that.api.app.auth().signOut();
        //if (user.emailVerified) {*/
          localStorage.setItem('user', user.displayName);
          that.api.user = user.displayName;
          if(user.displayName == 'candidat'){
            localStorage.setItem('candidat', user.photoURL);
            that.api.idCand = user.photoURL;
          } else if (user.displayName == 'entreprise'){
            localStorage.setItem('entreprise', user.photoURL);
            that.api.idEnt = user.photoURL;
          }
          that.router.navigate([user.displayName])
        /*} else {
          alert('Votre adresse Email n\'est pas encore vérifiée');
        }*/
      })
      .catch(function (error) {
        alert(error)
      })
  }

}
