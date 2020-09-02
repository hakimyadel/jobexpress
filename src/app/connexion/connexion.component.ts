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
        this.api.app.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(function (result) {
            let user = result.user
            //if(user.emailVerified){
              if(user.displayName === 'candidat'){
                that.router.navigate(['candidat'])
              }else if(user.displayName === 'entreprise') {
                that.router.navigate(['entreprise'])
              }else{
                that.router.navigate(['administration'])
              }
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
