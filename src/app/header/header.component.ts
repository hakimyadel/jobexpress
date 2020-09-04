import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FirebaseAppService} from "../services/firebase-app.service";

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public api: FirebaseAppService) {
  }

  ngOnInit(): void {
  }

  seDeconnecter() {
    localStorage.setItem('user', null);
    localStorage.setItem('key', null);
    this.api.user = null;
    this.router.navigate(['connexion']);
  }

}
