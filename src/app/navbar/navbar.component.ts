import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  //menu variable for smaller screens
  isMenuOpen: boolean = false;

  //open an close function for smaller screens
  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  //This is a log method utilising the signout method from the authentication service
  logOut(event: Event): void{
    event.preventDefault();
    this.authenticationService.signOut();
  }

  // method to check if the user is authenticated.
  isAuthenticated():boolean{
    return this.authenticationService.isAuthenticated();
  }

}
