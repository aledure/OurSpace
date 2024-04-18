import { Component, OnInit } from '@angular/core';
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
export class DashboardComponent {
  posts: Post[] = [];

  user: User | null = null;

  private userSubscription = new Subscription();

  newPost: CreatePost = {
    title: '',
    content: '',
    createdBy: 0,
  };

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getPosts();

    this.userSubscription.add(
      this.userService.currentUser.subscribe((user) => {
        if (user !== undefined) {
          this.user = user;
        }
        console.log(this.user);
      })
    );
  }

  getPosts() {
    this.postService.getPosts().subscribe((res: any) => {
      this.posts = res.data;
    });
  }

  onCreatePost() {
    this.newPost.createdBy = this.user?.id || 0;
    this.postService.createPost(this.newPost).subscribe(() => {
      this.getPosts();
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
