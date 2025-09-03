import { Component, OnInit,  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../users.service';
import { AlbumsServiceService } from '../albums-service.service';
import { AuthenticationService } from '../authentication.service';
import { Users } from '../user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  //variable to store loading state for mat-spinner
  isLoading: boolean = true;

  //this variable is used to display required columns
  displayedColumns: string[] = [ 'id', 'name', 'username', 'email', 'albumsTotal'];
  
  //variable to store fetched data
  dataSource = new MatTableDataSource<Users>([]);
  

  constructor(private userService: UsersService, private albumsService: AlbumsServiceService, private router: Router, private authetication: AuthenticationService) { }

  ngOnInit(): void {
    //calling the users list method on initialisation
    this.getUserList();    
  }

// This method gets  data from the jsonplaceholder via a service. 
  getUserList() {
    this.userService.getUsersWithTotalAlbums()
      .subscribe(data => {
        console.log(data)
        this.dataSource.data = data;
        this.isLoading = false;
      }
    );
  }

  // logging out method
  logOut() {
    sessionStorage.removeItem('loggedInUser')
    this.authetication.signOut();
  }

  //this tracks selected row
  selectedRow: any = null; 

  //This method navigates to the album page and handl's row click
  openAlbums( row: any) {
    this.selectedRow = this.selectedRow === row ? null:
    this.router.navigate(['album'])
  }
}
