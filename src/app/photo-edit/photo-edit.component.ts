import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotosService } from '../photos.service';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.scss']
})
export class PhotoEditComponent implements OnInit {

  // Form variable
  imageForm!: FormGroup;

  // Variable to store image id 
  imageId!: number;


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private photoService: PhotosService) {
    // Form set up with the validators and control to ensure right data to be posted to the server
    this.imageForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      url: ['', [Validators.required, Validators.pattern('https?://.+')]],
      thumbnailUrl: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
   }

  ngOnInit(): void {
    // Get the image ID from the route
    this.imageId = +this.route.snapshot.paramMap.get('id')!;

    // Fetch image data and populate the form
    this.photoService.getImage(this.imageId).subscribe({
      next: (image) => {
        this.imageForm.patchValue({
          title: image.title,
          url: image.url,
          thumbnailUrl: image.thumbnailUrl
        });
      },
      error: (err) => console.error('Error fetching image:', err)
    });
  }

  // Method to post data to the server after editting
  onSubmit(): void {
    if (this.imageForm.valid) {
      const updatedImage = this.imageForm.value;
      this.photoService.updateImage(this.imageId, updatedImage).subscribe({
        next: (response) => {
          alert('Image updated successfully!');
          this.router.navigate(['/albumInfo', this.imageId])
        },
        error: (err) => console.error('Error updating image:', err)
      });
    }
  }

}
