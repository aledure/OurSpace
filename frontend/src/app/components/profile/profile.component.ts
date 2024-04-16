import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from 'src/shared/services/post.service';
import { UserService, User } from 'src/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user: User | null = null;

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
        }
        console.log(this.user);
      })
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
