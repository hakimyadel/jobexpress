import { Component, OnInit } from '@angular/core';
import {Annonce} from "../interfaces/annonce";
import {FirebaseAppService} from "../services/firebase-app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  annonces : Annonce[] = [];

  constructor(private api: FirebaseAppService, private router: Router) {
    this.api.app.database().ref('/annonce').orderByChild("confirm")
      .equalTo('accepte').limitToLast(3).on("child_added", (data) => {
      this.annonces.push(data.val());
    })
  }

  ngOnInit(): void {
  }

}
