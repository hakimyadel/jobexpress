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
import { CandidatComponent } from './accueil/candidat/candidat.component';
import { EntrepriseComponent } from './accueil/entreprise/entreprise.component';

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
    EntrepriseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
