import { Component, OnInit } from '@angular/core';
import { Albums } from '../albums';
import { AlbumsServiceService } from '../albums-service.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  // Variable used to store received data for use in the html
  users: any[] = [];

  constructor(private albumService: AlbumsServiceService) { }

  ngOnInit(): void {
    // call function of the getting album list method
    this.getAlbumList();
  }

  // method used to get data from the server through the API service
  getAlbumList(){
    this.albumService.getUsersWithAlbumDetails().
    subscribe(data => {
      console.log(data)
      this.users = data;
    })
  }

}
