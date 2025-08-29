import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingSectionComponent } from './landing-section/landing-section.component';

const routes: Routes = [
  { path: '', component: LandingSectionComponent } //The path is empty string to reroute to landing page in the event of empty route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
