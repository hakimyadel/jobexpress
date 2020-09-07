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
    this.api.app.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(result => {
        let user = result.user
        this.api.app.auth().signOut();
        this.api.app.database().ref().child(user.displayName).child(user.photoURL)
          .child('password').set(this.password);
        //if (user.emailVerified) {*/
          localStorage.setItem('user', user.displayName);
          this.api.user = user.displayName;
          if(user.displayName == 'candidat'){
            localStorage.setItem('candidat', user.photoURL);
            this.api.idCand = user.photoURL;
          } else if (user.displayName == 'entreprise'){
            localStorage.setItem('entreprise', user.photoURL);
            this.api.idEnt = user.photoURL;
          }
          this.router.navigate([user.displayName])
        /*} else {
          alert('Votre adresse Email n\'est pas encore vérifiée');
        }*/
      })
      .catch(function (error) {
        alert(error)
      })
  }

}
