import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../app/login/login.component';
import {SignupComponent} from '../app/signup/signup.component';
import { PlacementsComponent } from '../app/placements/placements.component';
import {AuthGaurdService} from './services/auth-gaurd.service';
import { MyExperiencesComponent } from './my-experiences/my-experiences.component';
import { ViewPlacementComponent } from './view-placement/view-placement.component';
import { AddExperiencesComponent } from './add-experiences/add-experiences.component';


const routes: Routes = [
  { path: 'login',component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'placements',canActivate: [AuthGaurdService], component: PlacementsComponent },
  { path: 'my-experiences',canActivate: [AuthGaurdService], component: MyExperiencesComponent },
  { path: 'view-placement/:id',canActivate: [AuthGaurdService], component: ViewPlacementComponent },
  { path: 'add-experiences',canActivate: [AuthGaurdService], component: AddExperiencesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
