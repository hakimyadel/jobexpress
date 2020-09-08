import {Component, OnInit} from '@angular/core';
import {Annonce} from "../interfaces/annonce";
import {FirebaseAppService} from "../services/firebase-app.service";
import {Router} from "@angular/router";
import {wilayas, niveaux, experiences, domaines, diplomes} from "../interfaces/constantes";


@Component({
  selector: 'app-edit-annonce',
  templateUrl: './edit-annonce.component.html',
  styleUrls: ['./edit-annonce.component.css']
})
export class EditAnnonceComponent implements OnInit {
  annonce: Annonce = {
    nom: '',
    poste: '',
    creation: null,
    diplome: null,
    niveau: null,
    experience: null,
    wilaya: '',
    telephone: '',
    description: '',
    image:  'assets/images/photoProfile.jpg',
    confirm: 'attente',
    entreprise: null,
    domaine: null,
    idEntreprise: null,
    idAnnonce: null,
    candidats: []
  };
  wilayas = wilayas;
  niveaux = niveaux;
  diplomes = diplomes;
  experiences = experiences;
  chargement = false;


  constructor(public api: FirebaseAppService, private router: Router) {
    const that = this;
    if (this.api.idAnnonce) {
      this.api.app.database().ref().child('annonce').child(this.api.idAnnonce)
        .once('value', function (snapshot) {
          that.annonce = snapshot.val();
        }).catch(function (error) {
        console.log(error);
      });
    }
  }

  ngOnInit(): void {
  }

  creerAnnonce() {
    const that = this;
    const newKey = this.api.app.database().ref().child('/annonce').push().key;
    this.annonce.idAnnonce = newKey;
    this.annonce.idEntreprise = this.api.idEnt;
    this.annonce.creation = Date.now();
    this.api.app.database().ref().child('entreprise').child(this.api.idEnt)
      .once('value', function (snapshot) {
        that.annonce.entreprise = snapshot.val().nom;
        that.annonce.domaine = snapshot.val().domaine;
      }).then(()=>{
      this.api.app.database().ref().child('/annonce').child(newKey).set(this.annonce);
      this.router.navigate(['mesAnnonces'])
    }).catch(function (error) {
      console.log(error);
    });
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const almostUniqueFileName = Date.now().toString();
    const upload = this.api.app.storage().ref()
      .child('images/' + almostUniqueFileName + file.name).put(file);
    upload.on('state_changed',  (snapshot) => {
      this.chargement = true;
    }, (error) => {
      console.log(error)
    },  () => {
      upload.snapshot.ref.getDownloadURL().then((downloadURL) => {
        this.annonce.image = downloadURL
        this.chargement =false;
      });
    });
  }

  updateAnnonce() {
    this.api.app.database().ref().child('/annonce')
      .child(this.api.idAnnonce).set(this.annonce);
    this.api.idAnnonce = null;
    localStorage.setItem('annonce' , null);
    this.router.navigate(['mesAnnonces'])
  }

}
