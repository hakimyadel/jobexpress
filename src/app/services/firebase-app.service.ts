import {Injectable} from '@angular/core';
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAWjyzdfj7EBsHK3CPDu8R2dG3O6CLzjew",
  authDomain: "jobexpress008.firebaseapp.com",
  databaseURL: "https://jobexpress008.firebaseio.com",
  projectId: "jobexpress008",
  storageBucket: "jobexpress008.appspot.com",
  messagingSenderId: "396787710433",
  appId: "1:396787710433:web:08cb6c612e69bb1c0c7aa0"
};

@Injectable({
  providedIn: 'root'
})
export class FirebaseAppService {

  app: firebase.app.App;
  user: string;
  idUser:string;
  idAnnonce: string;


  constructor() {
    this.app = firebase.initializeApp(firebaseConfig);
    this.user = localStorage.getItem('user');
    this.idUser = localStorage.getItem('idUser');
    this.idAnnonce = localStorage.getItem('idAnnonce');
  }

  uploadFile(event) {
    let url;
    const file = event.target.files[0];
    const almostUniqueFileName = Date.now().toString();
    const upload = this.app.storage().ref()
      .child('images/' + almostUniqueFileName + file.name).put(file);
    upload.on('state_changed', function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, function (error) {
      console.log(error)
    }, function () {
      upload.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        url = downloadURL
      });
    });
    return url;
  }
}
