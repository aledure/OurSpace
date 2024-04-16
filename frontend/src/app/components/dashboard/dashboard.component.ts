import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  PostService,
  Post,
  CreatePost,
} from 'src/shared/services/post.service';
import { UserService, User } from 'src/shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  user: User | null = null;
  private userSubscription = new Subscription();
  newPost: CreatePost = { title: '', content: '', createdBy: 0 };

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getPosts();

    this.userSubscription = this.userService.me().subscribe(
      (response) => {
        this.user = response.user;
        console.log(this.user);
      },
      (error) => {
        console.error('Error fetching user information:', error);
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  getPosts() {
    this.postService.getPosts().subscribe((res: any) => {
      this.posts = res.data;
    });
  }

  onCreatePost() {
    if (this.user) {
      this.newPost.createdBy = this.user.id;
      this.postService.createPost(this.newPost).subscribe(() => {
        this.getPosts();
        // Reset the new post form
        this.newPost = { title: '', content: '', createdBy: 0 };
      });
    } else {
      console.error('User is not logged in');
    }
  }

  logout() {
    this.userService.logout();
  }
}
