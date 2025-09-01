import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from './user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // variable to assigned the link from which the data is received from.
   url: string = "https://jsonplaceholder.typicode.com/users";

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // API to get users from json place holder
   getUsers(): Observable<Users[]> {
    console.log(`memeber url is ${this.url}`)
    return this.httpClient.get<Users[]>(this.url);
  }

}