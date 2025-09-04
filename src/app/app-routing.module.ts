// Imports the pages to be defined as paths to specific pages.
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingSectionComponent } from './landing-section/landing-section.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumInfoComponent } from './album-info/album-info.component';
import { PhotoEditComponent } from './photo-edit/photo-edit.component';
import { AuthGuard } from './auth.guard';

// The following defines specific routes
const routes: Routes = [
  { path: 'landingPage', component: LandingSectionComponent }, //The path is empty string to reroute to landing page in the event of empty route
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersListComponent, canActivate: [AuthGuard] },//this uses auth guard to view the links only after log in.
  { path: 'album', component: AlbumsComponent, canActivate: [AuthGuard] },//this uses auth guard to view the links only after log in.
  { path: 'albumInfo/:id', component: AlbumInfoComponent, canActivate: [AuthGuard]},//this uses auth guard to view the links only after log in.
  { path: 'photoEdit/:id', component: PhotoEditComponent, canActivate: [AuthGuard]},//this uses auth guard to view the links only after log in.
  { path: '', redirectTo: '/landingPage', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
