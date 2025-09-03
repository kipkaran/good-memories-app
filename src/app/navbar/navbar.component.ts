import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }
}
