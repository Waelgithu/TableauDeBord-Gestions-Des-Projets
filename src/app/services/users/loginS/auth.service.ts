import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8091/Athentication/authenticate';

  constructor(private http: HttpClient) {}

  authenticate(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(this.authUrl, credentials, { withCredentials: true });
  }
}
