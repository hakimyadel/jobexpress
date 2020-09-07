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
    image:  'assets/images/photoProfile.jpg',
    annonces: [],
    userId: null
  };
  wilayas = wilayas;
  domaines = domaines;
  confirmPassword: string;

  constructor(public api: FirebaseAppService, private router: Router) {
    const that = this;
    if (this.api.user === 'entreprise') {
      this.api.app.database().ref().child('entreprise').child(this.api.idEnt)
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
    this.api.app.auth().createUserWithEmailAndPassword(this.entreprise.email, this.entreprise.password)
      .then((result) => {
        const newKey = this.api.app.database().ref().child('/entreprise').push().key;
        result.user.updateProfile({displayName: 'entreprise', photoURL: newKey});
        this.entreprise.userId = newKey;
        this.api.app.database().ref().child('/entreprise').child(newKey).set(this.entreprise);
        result.user.sendEmailVerification().then( () => {
          alert('Un lien de vérification a été envoyé à votre boite email. Veuillez le confirmer pour pouvoir accéder à votre compte ')
          this.api.app.auth().signOut();
          this.router.navigate(['connexion'])
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
      .child(this.api.idEnt).set(this.entreprise);
    this.api.app.database().ref('/annonce').orderByChild("idEntreprise")
      .equalTo(this.api.idEnt).on("child_added",  (data) => {
      this.api.app.database().ref().child('/annonce')
        .child(data.key).child('entreprise').set(this.entreprise.nom);
      this.api.app.database().ref().child('/annonce')
        .child(data.key).child('domaine').set(this.entreprise.domaine);
    });
    this.router.navigate(['entreprise'])
  }

}
