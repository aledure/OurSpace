import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'OurSpace';

  private authSubscription = new Subscription();

  constructor(
    private userService: UserService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    if (this.cookieService.check('token')) {
      this.authSubscription.add(
        this.userService.me().subscribe((response) => {
          this.userService.setUser(response.user);
        })
      );
    }
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
