import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../config/config.js';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(config.PAPYRUSFRONT+`/users`);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(config.PAPYRUSFRONT+`/${id}`);
  }
}