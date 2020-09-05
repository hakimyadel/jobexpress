import {Component, OnInit} from '@angular/core';
import {Entreprise} from "../interfaces/entreprise";
import {FirebaseAppService} from "../services/firebase-app.service";
import {Router} from "@angular/router";
import {wilayas, domaines} from "../interfaces/constantes";

@Component({
  selector: 'app-edit-entreprise',
  templateUrl: './edit-entreprise.component.html',
  styleUrls: ['./edit-entreprise.component.css']
})
export class EditEntrepriseComponent implements OnInit {
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
  };
  wilayas = wilayas;
  domaines = domaines;
  confirmPassword: string;

  constructor(public api: FirebaseAppService, private router: Router) {
    const that = this;
    if (this.api.user === 'entreprise') {
      this.api.app.database().ref().child('entreprise').child(this.api.idUser)
        .once('value', function (snapshot) {
          that.entreprise = snapshot.val();
        }).catch(function (error) {
        console.log(error);
      });
    }
  }

  ngOnInit(): void {
  }

  creerEntreprise() {
    let that = this;
    this.api.app.auth().createUserWithEmailAndPassword(this.entreprise.email, this.entreprise.password)
      .then(function (result) {
        const newKey = that.api.app.database().ref().child('/entreprise').push().key;
        result.user.updateProfile({displayName: 'entreprise', photoURL: newKey});
        that.entreprise.userId = result.user.uid;
        that.api.app.database().ref().child('/entreprise').child(newKey).set(that.entreprise);
        result.user.sendEmailVerification().then(function () {
          alert('Un lien de vérification a été envoyé à votre boite email. Veuillez le confirmer pour pouvoir accéder à votre compte ')
          that.api.app.auth().signOut();
          that.router.navigate(['connexion'])
        }).catch(function (error) {
        });
      })
      .catch(function (error) {
        alert(error)
      });

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
        that.entreprise.image = downloadURL
      });
    });
  }

  updateProfile() {
    this.api.app.database().ref().child('/entreprise')
      .child(this.api.idUser).set(this.entreprise);
    this.router.navigate(['entreprise'])
  }

}
