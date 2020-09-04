import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  seDeconnecter() {
    localStorage.setItem('user', null);
    localStorage.setItem('key', null);
    this.router.navigate(['connexion']);
  }

}
