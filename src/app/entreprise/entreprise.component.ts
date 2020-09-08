import {Component, OnInit} from '@angular/core';
import {FirebaseAppService} from "../services/firebase-app.service";
import {Router} from "@angular/router";
import {Entreprise} from "../interfaces/entreprise";

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent implements OnInit {


  entreprise: Entreprise = {
    nom: '',
    email: '',
    password: '',
    creation: null,
    domaine: '',
    wilaya: '',
    telephone: '',
    adresse: '',
    description: '',
    image: '',
    annonces: [],
    userId: null
  }

  constructor(public api: FirebaseAppService, private router: Router) {
    const that = this;
    this.api.app.database().ref().child('entreprise').child(this.api.idEnt)
      .on('value', function (snapshot) {
        that.entreprise = snapshot.val();
      });
  }

  ngOnInit(): void {
  }

  editerProfile() {
    this.router.navigate(['edit/entreprise']);
  }

  voirAnnonces() {
    this.router.navigate(['mesAnnonces']);
  }

  modifierPasword() {
    this.router.navigate(['edit/password']);
  }

  supprimerProfile() {
    if (confirm("Voulez vous vraiment supprimer votre profile ?")) {
      this.api.app.database().ref('/annonce').orderByChild("idEntreprise")
        .equalTo(this.api.idEnt).on("child_added",  (data) => {
        this.api.app.database().ref().child('annonce').child(data.val().idAnnonce).remove();
      });
      this.api.app.auth().signInWithEmailAndPassword(this.entreprise.email, this.entreprise.password).then( result => {
        this.api.app.database().ref().child('entreprise').child(this.api.idEnt).remove();
        result.user.delete().then(()=>{
          alert('Votre profil a bien été supprimé');
          localStorage.setItem('user', null);
          localStorage.setItem('entreprise', null);
          localStorage.setItem('candidat', null);
          localStorage.setItem('annonce', null);
          this.api.user = null;
          this.api.idEnt = null;
          this.api.idCand = null;
          this.api.idAnnonce = null;
          this.router.navigate(['accueil']);
        }).catch(error => alert(error))
      }).catch(error => alert(error))
    }
  }
}
