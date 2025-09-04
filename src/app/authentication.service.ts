declare var google: any;
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router) { }

  // checking if the user is authenticated by verifying sessionStorage
  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('loggedInUser');
  }
  
  // This method gets logged-in user details
  getUser(): any {
    const user = sessionStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  }

  // Sign out method that also removes user auth sessions
  signOut(){
    sessionStorage.removeItem('loggedInUser');
    this.router.navigate(['login']);
  }
}
