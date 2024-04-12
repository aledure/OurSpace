import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = environment.API_URL + '/api/v1/user';

  constructor(private http: HttpClient) { }

  register(postData: any) {
    return this.http.post(`${this.apiUrl}/register`, postData);
  }

  login(postData: any) {
    return this.http.post(`${this.apiUrl}/login`, postData);
  }

  getMe(postData: any) {
    return this.http.post(`${this.apiUrl}`, postData);
  }

}
