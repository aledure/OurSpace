import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService, Post } from 'src/shared/services/post.service';
import { UserService, User } from 'src/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user: User | null = null;
  userPosts: Post[] = [];

  private userSubscription = new Subscription();

  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.userSubscription = this.userService.me().subscribe(
      (response) => {
        this.user = response.user;
        console.log(this.user);
      },
      (error) => {
        console.error('Error fetching user information:', error);
      }
    );
    this.getPostsByUser();
  }

  getPostsByUser() {
    if (this.user) {
      this.postService
        .getPostsByUser({ userId: this.user.id.toString() })
        .subscribe((res: any) => {
          this.userPosts = res.posts; // Store user's posts
          console.log('posts: ', this.userPosts);
        });
    } else {
      console.error('User is not logged in');
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
