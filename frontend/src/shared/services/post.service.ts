import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  apiUrl: string = environment.API_URL + '/api/v1/posts';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(this.apiUrl);
  }

  getPost(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createPost(postData: any) {
    return this.http.post(`${this.apiUrl}`, postData);
  }

  updatePost(postData: any) {
    return this.http.put(`${this.apiUrl}/${postData._id}`, postData);
  }

  deletePost(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
