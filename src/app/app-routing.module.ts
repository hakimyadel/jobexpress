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
import {AnnoncesEntrepriseComponent} from "./annonces-entreprise/annonces-entreprise.component";
import {AdminComponent} from "./admin/admin.component";
import {ModifierPasswordComponent} from "./modifier-password/modifier-password.component";
import {ReinitialiserPasswordComponent} from "./reinitialiser-password/reinitialiser-password.component";
import {AuthEntrepriseService} from "./services/auth-entreprise.service";
import {AuthCandidatEntrepriseService} from "./services/auth-candidat-entreprise.service";
import {AuthAdminService} from "./services/auth-admin.service";

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'edit/annonce', canActivate: [AuthEntrepriseService], component: EditAnnonceComponent },
  { path: 'edit/candidat', component: EditCandidatComponent },
  { path: 'edit/entreprise', component: EditEntrepriseComponent },
  { path: 'recherche', canActivate: [AuthCandidatService], component: RechercheComponent },
  { path: 'annonce', component: AnnonceComponent },
  { path: 'candidat', canActivate: [AuthCandidatEntrepriseService], component: CandidatComponent },
  { path: 'entreprise', canActivate: [AuthCandidatEntrepriseService], component: EntrepriseComponent },
  { path: 'mesAnnonces', canActivate: [AuthEntrepriseService], component: AnnoncesEntrepriseComponent },
  { path: 'init/password', component: ReinitialiserPasswordComponent },
  { path: 'edit/password', canActivate: [AuthCandidatEntrepriseService], component: ModifierPasswordComponent },
  { path: 'admin', canActivate: [AuthAdminService], component: AdminComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', redirectTo: 'accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
