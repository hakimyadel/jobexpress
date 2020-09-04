import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConnexionComponent} from "./connexion/connexion.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {EditAnnonceComponent} from "./edit-annonce/edit-annonce.component";
import {EditCandidatComponent} from "./edit-candidat/edit-candidat.component";
import {EditEntrepriseComponent} from "./edit-entreprise/edit-entreprise.component";
import {RechercheComponent} from "./recherche/recherche.component";
import {AnnonceComponent} from "./annonce/annonce.component";
import {CandidatComponent} from "./candidat/candidat.component";
import {EntrepriseComponent} from "./entreprise/entreprise.component";
import {AuthCandidatService} from "./services/auth-candidat.service";

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'edit/annonce', component: EditAnnonceComponent },
  { path: 'edit/candidat', component: EditCandidatComponent },
  { path: 'edit/entreprise', component: EditEntrepriseComponent },
  { path: 'recherche', component: RechercheComponent },
  //{ path: 'annonce', canActivate: [AuthGuardService], component: AnnonceComponent },
  { path: 'annonce', component: AnnonceComponent },
  { path: 'candidat', canActivate: [AuthCandidatService], component: CandidatComponent },
  { path: 'entreprise', component: EntrepriseComponent },
  { path: 'adminisration', component: AccueilComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', redirectTo: 'accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
