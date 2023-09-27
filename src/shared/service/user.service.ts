// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users/self';
  private loggedInUsernameSubject = new Subject<User>(); // Initialize with an empty string
  loggedInUsername$ = this.loggedInUsernameSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getLoggedInUsername();
  }

  getLoggedInUsername() {
    this.http.get<any>(this.apiUrl).subscribe(user => {
      this.loggedInUsernameSubject.next(user);
    })
  }
}
