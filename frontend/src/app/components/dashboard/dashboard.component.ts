import { Component } from '@angular/core';
import { POSTS } from 'src/assets/posts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  posts = POSTS;
}
