import {Component, OnInit} from '@angular/core';
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
    this.refresh();
  }

  ngOnInit(): void {
  }

  detailAnnonce(event) {
    const cleAnnonce = event.target.parentElement.parentElement.firstChild.textContent;
    this.api.idAnnonce = cleAnnonce;
    localStorage.setItem('annonce' , cleAnnonce);
    this.router.navigate(['annonce']);
  }

  detailEntreprise(event) {
    const cleEntreprise = event.target.parentElement.parentElement.lastChild.textContent;
    this.api.idUser = cleEntreprise;
    localStorage.setItem('key' , cleEntreprise);
    this.router.navigate(['entreprise']);

  }

  refuser(event) {
    const cleAnnonce = event.target.parentElement.parentElement.firstChild.textContent;
    if (confirm("Voulez vous vraiment refuser cette annonce ?")) {
      this.api.app.database().ref().child('annonce').child(cleAnnonce).child('confirm').set('refuse');
      this.refresh();
    }
  }

  accepter(event) {
    const cleAnnonce = event.target.parentElement.parentElement.firstChild.textContent;
    console.log(cleAnnonce)
    if (confirm("Voulez vous vraiment accepter cette annonce ?")) {
      this.api.app.database().ref().child('annonce').child(cleAnnonce).child('confirm').set('accepte');
      this.refresh();
    }
  }

  refresh() {
    this.annonces = [];
    this.api.app.database().ref('/annonce').orderByChild("confirm")
      .equalTo('attente').on("child_added", (data) => {
      this.annonces.push(data.val());
    });
  }


}
