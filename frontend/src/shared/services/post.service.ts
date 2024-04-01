import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  apiUrl: string = environment.API_URL + '/posts';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(this.apiUrl);
  }

  getPost(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createPost(postData: any) {
    return this.http.post(`${this.apiUrl}/create`, postData);
  }
}
