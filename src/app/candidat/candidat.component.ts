import { Component, OnInit } from '@angular/core';
import {FirebaseAppService} from "../services/firebase-app.service";
import {Candidat} from "../interfaces/candidat";
import {Router} from "@angular/router";

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent implements OnInit {

  candidat: Candidat;

  constructor(private api : FirebaseAppService, private router: Router) {
    let that = this;
    let cle = this.api.app.auth().currentUser.photoURL;
    console.log(cle);
    this.api.app.database().ref().child('candidat').child(cle).once('value', function (snapshot) {
      console.log(snapshot.val());
      that.candidat = snapshot.val()
    } ).catch(function (error) {
      console.log(error)
    })
  }

  ngOnInit(): void {
  }

  seDeconnecter() {
    this.api.app.auth().signOut();
    this.router.navigate(['connexion']);
  }
}
