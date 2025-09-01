import { Component, OnInit, ViewChild, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../users.service';
import { Users } from '../user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = [ 'id', 'name', 'username', 'email', 'action'];

  
  dataSource = new MatTableDataSource<Users>([]);
  

  constructor(private userService: UsersService, private router: Router,) { }

  ngOnInit(): void {
    this.getUserList();
  }

  // This method gets users data from the jsonplaceholder via a service. 
  getUserList() {
    this.userService.getUsers()
      .subscribe((data: Users[]) =>{
        this.dataSource.data = data;
        console.log(data);
      }
    );
  }

  //This method navigates to the album page
  openAlbums() {
    this.router.navigate(['album'])
  }
}
