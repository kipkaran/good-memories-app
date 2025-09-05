declare var google: any;//declares the google accouns 
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // initializes google sign in
    google.accounts.id.initialize({
      client_id: '46294703699-ln5sb3jvlehgdgp6f32d9den0ds97muh.apps.googleusercontent.com',
      callback: (resp: any) => this.handlingLogIn(resp)
    });
    
    // this renders the google sign in button
    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectagle',
    })
  }

  // this decodes the token
  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  //this method handles the log in and gives sucessfull or 
  handlingLogIn(response: any) {
    try {
      if (response && response.credential) {
        const payload = this.decodeToken(response.credential);
        sessionStorage.setItem("loggedInUser", JSON.stringify(payload));
        this.snackBar.open('Login successful!', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigate(['users']);
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error) {
      this.snackBar.open('Login failed. Please try again.', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar'] 
      });
      console.error('Login error:', error);
    }
  }
}
