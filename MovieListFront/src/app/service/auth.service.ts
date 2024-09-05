import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5017/api/Users';

  constructor(private http: HttpClient) {}

  register(userData: User): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}