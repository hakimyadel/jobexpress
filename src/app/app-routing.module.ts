import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConnexionComponent} from "./connexion/connexion.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {EditAnnonceComponent} from "./edit-annonce/edit-annonce.component";
import {EditCandidatComponent} from "./edit-candidat/edit-candidat.component";
import {EditEntrepriseComponent} from "./edit-entreprise/edit-entreprise.component";
import {RechercheComponent} from "./recherche/recherche.component";
import {AnnonceComponent} from "./annonce/annonce.component";

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'accueil', canActivate: [AuthGuardService], component: AccueilComponent },
  { path: 'edit/annonce', canActivate: [AuthGuardService], component: EditAnnonceComponent },
  { path: 'edit/candidat', canActivate: [AuthGuardService], component: EditCandidatComponent },
  { path: 'edit/entreprise', canActivate: [AuthGuardService], component: EditEntrepriseComponent },
  { path: 'recherche', canActivate: [AuthGuardService], component: RechercheComponent },
  { path: 'annonce', canActivate: [AuthGuardService], component: AnnonceComponent },
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },
  { path: '**', redirectTo: 'connexion' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
