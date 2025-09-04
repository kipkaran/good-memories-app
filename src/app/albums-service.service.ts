import { Injectable } from '@angular/core';
import { Albums } from './albums';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, map, Observable,} from 'rxjs';
import { Users } from './user';
import { Photos } from './photo';

@Injectable({
  providedIn: 'root'
})
export class AlbumsServiceService {

  // Variables to store the urls of where the data is received from
  usersUrl: string = 'https://jsonplaceholder.typicode.com/users';
  albumsUrl: string = 'https://jsonplaceholder.typicode.com/albums';
  photosUrl: string = 'https://jsonplaceholder.typicode.com/photos';
  

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // method using get to fetch data from the server acting as an API
  getUsersWithAlbumDetails(): Observable<any[]> {
    const users$ = this.httpClient.get<Users[]>(this.usersUrl);
    const albums$ = this.httpClient.get<any[]>(this.albumsUrl);
    const photos$ = this.httpClient.get<Photos[]>(this.photosUrl);

    return forkJoin([users$, albums$, photos$]).pipe(
      map(([users, albums, photos]) => {
        return users.map((user) => {
          //gets all the albums for current user
          const userAlbums = albums.filter(album=> album.userId === user.id);

          //each album is mapped to include include its photo count and cover photo
          const enhancedAlbums = userAlbums.map(album => {
            const albumPhotos = photos.filter(photo => photo.albumId === album.id);
            return {
              ...album, 
              photoCount: albumPhotos.length,
              coverPhoto: albumPhotos.length > 0? albumPhotos[0].thumbnailUrl: null
            };
          });
          return {
            ...user,
            albums: enhancedAlbums
          }
        });
      })
    );
  }
}
