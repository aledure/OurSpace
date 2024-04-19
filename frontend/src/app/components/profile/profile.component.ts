import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService, Post } from 'src/shared/services/post.service';
import { UserService, User } from 'src/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  userPosts: Post[] = [];

  private userSubscription = new Subscription();

  constructor(
    // private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.userSubscription.add(
      this.userService.currentUser.subscribe((user) => {
        // console.log('user: ', user);
        if (user !== undefined && user !== null) {
          this.user = user;
          this.loadUserPosts(user.userId);
        }
      })
    );
  }

  loadUserPosts(id: string) {
    const userIdString = id.toString(); // Convert number to string
    this.postService.getPostsByUser({ userId: userIdString }).subscribe(
      (response) => {
        console.log('res', response);

        this.userPosts = response.data;
      },
      (error) => {
        console.error('Error loading user posts:', error);
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
