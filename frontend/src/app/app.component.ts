import { Component } from '@angular/core';
import { POSTS } from 'src/assets/posts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'OurSpace';
  posts = POSTS;
}
