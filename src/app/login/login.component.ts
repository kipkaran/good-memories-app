declare var google: any;
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '46294703699-ln5sb3jvlehgdgp6f32d9den0ds97muh.apps.googleusercontent.com',
      callback: (resp: any) => this.handlingLogIn(resp)
    });
    
    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectagle',
    })
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  handlingLogIn(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential);
      sessionStorage.setItem("loggedInUser", JSON.stringify(payload));
      this.router.navigate(['users']);
    };
  }

}
