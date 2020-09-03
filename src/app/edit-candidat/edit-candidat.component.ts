import {Component, OnInit} from '@angular/core';
import {Candidat} from "../interfaces/candidat";
import {FirebaseAppService} from "../services/firebase-app.service";
import {Router} from "@angular/router";
import {wilayas, niveaux, experiences} from "../interfaces/constantes";


@Component({
  selector: 'app-edit-candidat',
  templateUrl: './edit-candidat.component.html',
  styleUrls: ['./edit-candidat.component.css']
})
export class EditCandidatComponent implements OnInit {
  candidat: Candidat;
  wilayas = wilayas;
  niveaux = niveaux;
  experiences = experiences
  confirmPassword: string;

  imageuRL: string;


  constructor( private api: FirebaseAppService, private router: Router) {
    this.candidat = {
      nom: 'abi ayad',
      prenom: 'fethi',
      naissance: null,
      email: 'fethipharm010@gmail.com',
      password: 'qwerty',
      wilaya: null,
      telephone: '0555555555',
      diplome: 'pharmacien',
      niveau: null,
      experience: null,
      description: '',
      image: 'assets/images/photoProfile.jpg',
      userId: null
    }
  }

  ngOnInit(): void {
  }

  creerCandidat() {
    let that = this;
    this.api.app.auth().createUserWithEmailAndPassword(this.candidat.email, this.candidat.password)
      .then(function (result) {
        const newKey = that.api.app.database().ref().child('/candidat').push().key;
        result.user.updateProfile({displayName: 'candidat', photoURL: newKey});
        that.candidat.userId = result.user.uid;
        that.api.app.database().ref().child('/candidat').child(newKey).set(that.candidat);
        result.user.sendEmailVerification().then(function () {
          console.log('email de verification envoyé')
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
    const file = event.target.files[0];
    let that = this;
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
        that.candidat.image = downloadURL
      });
    });
  }



}
