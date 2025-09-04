import { Component, OnInit } from '@angular/core';
import { Photos } from '../photo';
import { PhotosService } from '../photos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-album-info',
  templateUrl: './album-info.component.html',
  styleUrls: ['./album-info.component.scss']
})
export class AlbumInfoComponent implements OnInit {

  //this variable stores fetched data from the server
  myImages: Photos[] = [];

  // variable to store album id
  albumId: number | null = null;

  //loader variable
  isLoading: boolean = true;
  
  imageId!: number;

  constructor(private photosService: PhotosService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // calling of the method
    this.getPhotosById();
    this.imageId = +this.route.snapshot.paramMap.get('id')!;
  }

  // method to fetch images by album id by use of a service API
  getPhotosById(){
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.albumId = +id;
        this.photosService.getPhotosByAlbumId(this.albumId).
        subscribe(data => {
          console.log(data)
          this.myImages = data;
          this.isLoading = false;
        });
      }
    });
  }

  // This method fetches selected image by id for editing and navigates to photo editing page
  goToImage(imageId: number): void  {
    this.router.navigate(['/photoEdit',imageId]);
  }

}