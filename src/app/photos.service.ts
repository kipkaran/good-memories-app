import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Photos } from './photo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  // variable to store the link for fetching data
  photosUrl: string = "https://jsonplaceholder.typicode.com/photos";

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // method to get images by album Id. 
  getPhotosByAlbumId(albumId: number): Observable<Photos[]>{
    return this.httpClient.get<Photos[]>(`${this.photosUrl}?albumId=${albumId}`);
  }

  // This method gets images by Id.
  getImage(id: number): Observable<Photos> {
    return this.httpClient.get<Photos>(`${this.photosUrl}/${id}`);
  }

  // This method patches is used to edit photo details and posts to the server
  updateImage(id: number, imageData: Photos): Observable<Photos> {
    return this.httpClient.patch<Photos>(`${this.photosUrl}/${id}`, imageData);
  }

}
