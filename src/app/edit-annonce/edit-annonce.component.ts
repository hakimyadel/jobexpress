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
    creation: null,
    diplome: null,
    niveau: null,
    experience: null,
    wilaya: '',
    telephone: '',
    description: '',
    image: '',
    confirm: 'attente',
    idEntreprise: null,
    candidats: []
  };
  wilayas = wilayas;
  niveaux = niveaux;
  diplomes = diplomes;
  experiences = experiences;


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
    const newKey = this.api.app.database().ref().child('annonce').push().key;
    alert(newKey)
    this.api.app.database().ref().child('entreprise').child(this.api.idUser)
      .child('annonces').update(newKey)
    this.annonce.idEntreprise = this.api.idUser;
    this.annonce.creation = new Date();
    this.api.app.database().ref().child('annonce').child(newKey).set(this.annonce);
    this.router.navigate(['entreprise'])
  }

  uploadFile(event) {
    const that = this
    const file = event.target.files[0];
    const almostUniqueFileName = Date.now().toString();
    const upload = this.api.app.storage().ref()
      .child('images/' + almostUniqueFileName + file.name).put(file);
    upload.on('state_changed', function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, function (error) {
      console.log(error)
    }, function () {
      upload.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        that.annonce.image = downloadURL
      });
    });
  }

  updateAnnonce() {
    this.api.app.database().ref().child('/annonce')
      .child(this.api.idAnnonce).set(this.annonce);
    this.router.navigate(['entreprise'])
  }

}
