import { Component } from '@angular/core';
import { Post } from 'src/shared/models/post.model';
import { PostService } from 'src/shared/services/post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  posts: Post[] = [];

  newPost: Post = {
    id: '',
    createdBy: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: '',
    content: '',
  };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private postService: PostService) {
    this.getPosts();
  }
  getPosts() {
    this.postService.getPosts().subscribe((res: any) => {
      this.posts = res.data;
    });
  }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe((res: any) => {
      this.getPosts();
    });
  }
  updatePost(post: Post) {
    this.postService.updatePost(post).subscribe((res: any) => {
      this.getPosts();
    });
  }
  onCreatePost() {
    this.postService.createPost(this.newPost).subscribe(
      (res: any) => {
        console.log('Post created successfully:', res);
        this.successMessage = 'Post created successfully';
        this.errorMessage = '';
        this.newPost = {
          id: '',
          createdBy: '900202404051714027266610',
          createdAt: new Date(),
          updatedAt: new Date(),
          title: '',
          content: '',
        };
        this.getPosts();
      },
      (error: any) => {
        console.error('Error creating post:', error);
        this.successMessage = '';
        this.errorMessage = 'Error creating post. Please try again.';
      }
    );
  }
}
