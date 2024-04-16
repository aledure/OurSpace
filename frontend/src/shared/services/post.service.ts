import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';

export interface Post {
  _id: string;
  title: string;
  content: string;
  createdBy: number;
  createdAt: string;
  updatedAt: Date;
}

export interface CreatePost {
  title: string;
  content: string;
  createdBy: number;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  apiUrl: string = environment.API_URL + '/api/v1/posts';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<{ posts: Post[] }>(this.apiUrl);
  }

  getPost({ id }: { id: string }) {
    return this.http.get<{ post: Post }>(`${this.apiUrl}/${id}`);
  }

  getPostsByUser({ userId }: { userId: string }) {
    return this.http.get<{ posts: Post[] }>(`${this.apiUrl}/user/${userId}`);
  }

  createPost({ title, content, createdBy }: CreatePost) {
    return this.http.post<{ post: Post }>(this.apiUrl, {
      title,
      content,
      createdBy,
    });
  }

  updatePost({ id, postData }: { id: string; postData: Post }) {
    return this.http.put<{ post: Post }>(`${this.apiUrl}/${id}`, postData);
  }

  deletePost({ id }: { id: string }) {
    return this.http.delete<{ post: Post }>(`${this.apiUrl}/${id}`);
  }
}
