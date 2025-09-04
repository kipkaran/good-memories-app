import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { Users } from './user';
import { Albums } from './albums';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // variable to assigned the link from which the data is received from.
   usersUrl: string = "https://jsonplaceholder.typicode.com/users";

   albumsUrl: string = 'https://jsonplaceholder.typicode.com/albums';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

// API to get users and albums from json place holder
  getUsersWithTotalAlbums(): Observable<any[]> {
    const users$ = this.httpClient.get<Users[]>(this.usersUrl);
    const albums$ = this.httpClient.get<Albums[]>(this.albumsUrl);

    return forkJoin([users$, albums$]).pipe(
      map(([users, albums]) => {
        return users.map(user =>{
          const albumsTotal = albums.filter(album => album.userId === user.id).length;
          return {
            ...user,
            albumTotal: albumsTotal
          };
        });
      })
    );
  }
}