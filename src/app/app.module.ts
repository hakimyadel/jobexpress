import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { EditCandidatComponent } from './edit-candidat/edit-candidat.component';
import { EditEntrepriseComponent } from './edit-entreprise/edit-entreprise.component';
import { AccueilComponent } from './accueil/accueil.component';
import { EditAnnonceComponent } from './edit-annonce/edit-annonce.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { RechercheComponent } from './recherche/recherche.component';
import { CandidatComponent } from './candidat/candidat.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import {FormsModule} from "@angular/forms";
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConnexionComponent,
    EditCandidatComponent,
    EditEntrepriseComponent,
    AccueilComponent,
    EditAnnonceComponent,
    AnnonceComponent,
    RechercheComponent,
    CandidatComponent,
    EntrepriseComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
