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

  constructor(private api: FirebaseAppService ,private router : Router) {
    this.email = '';
    this.password = '';

  }

  ngOnInit(): void {
  }

  seConnecter() {
        let that = this;
        this.api.app.auth().signOut();
        this.api.app.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(function (result) {
            console.log(result.user)
            let user = result.user
            //if(user.emailVerified){
                that.router.navigate([user.displayName])
            /*} else {
              that.api.app.auth().signOut();
              alert('Votre adresse Email n\'est pas encore vérifiée');
            }*/
          })
          .catch(function (error) {
            alert(error)
          })

  }

  updatename() {
    this.api.app.auth().currentUser.updateProfile( {displayName: 'candidat'});
  }



}
