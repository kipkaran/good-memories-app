import { Component, OnInit } from '@angular/core';
import { Albums } from '../albums';
import { AlbumsServiceService } from '../albums-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  // variable to hold spinner state during loading
  isLoading: boolean = true;

  //The variable stores the user data from the server
  users: any[] = [];

  // variable to hold the album data from the server
  albums: Albums[] = [];

  constructor(private albumService: AlbumsServiceService, private router: Router) { }

  ngOnInit(): void {
    //calling the album list method
    this.getAlbumList();
  }

  //method to fetchdata from the server via the albums API service in album-service.ts
  getAlbumList(){
    this.albumService.getUsersWithAlbumDetails().
    subscribe(data => {
      console.log(data)
      this.users = data;
      this.isLoading = false;
    })
  }

  // method fetches images by album id and navigates to the page that displays them.
  goToPhotos(albumId: number): void  {
    this.router.navigate(['/albumInfo',albumId]);
  }
}
