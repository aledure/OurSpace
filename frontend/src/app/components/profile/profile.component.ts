import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService, Post } from 'src/shared/services/post.service';
import { UserService, User } from 'src/shared/services/user.service';
import { POSTS } from 'src/assets/posts';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  userPosts: Post[] = [];
  dummyPosts: any[] = POSTS;

  private userSubscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.userSubscription.add(
      this.userService.currentUser.subscribe((user) => {
        if (user !== undefined) {
          this.user = user;
          this.loadUserPosts();
        }
      })
    );
  }

  loadUserPosts() {
    if (this.user) {
      const userIdString = this.user.id.toString(); // Convert number to string
      this.postService.getPostsByUser({ userId: userIdString }).subscribe(
        (response) => {
          this.userPosts = response.posts;
        },
        (error) => {
          console.error('Error loading user posts:', error);
        }
      );
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
