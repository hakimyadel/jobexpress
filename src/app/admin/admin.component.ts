import { Component, OnInit } from '@angular/core';
import {Annonce} from "../interfaces/annonce";
import {FirebaseAppService} from "../services/firebase-app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  annonces: Annonce[] = [];

  constructor(private api: FirebaseAppService, private router: Router) {
    this.api.app.database().ref('/annonce').orderByChild("confirm")
      .equalTo('attente').on("child_added",  (data) => {
      this.annonces.push(data.val());
    });
  }

  ngOnInit(): void {
  }

}
