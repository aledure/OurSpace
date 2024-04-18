import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/app/environments/environment';

export interface User {
  id: number;
  username: string;
}

export interface CreateUser {
  username: string;
  email: string;
  password: string;
  bio: string;
  userImage: string;
  posts: any[];
}

export interface LoginUser {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$ = new BehaviorSubject<User | undefined | null>(null);

  get currentUser() {
    return this.user$.asObservable();
  }

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  setUser(user: User) {
    const { id, username } = user;
    console.log('setUser response: ', id, username);
    this.user$.next({ id, username });
  }

  register({ username, email, password }: CreateUser) {
    return this.httpClient
      .post<{ user: User; token: string }>(
        `${environment.API_URL}/api/v1/auth/register`,
        { username, email, password }
      )
      .pipe(tap(({ token }) => this.cookieService.set('token', token)));
  }

  login({ email, password }: LoginUser) {
    return this.httpClient
      .post<{ user: User; token: string }>(
        `${environment.API_URL}/api/v1/auth/login`,
        { email, password }
      )
      .pipe(tap(({ token }) => this.cookieService.set('token', token)));
  }

  me() {
    return this.httpClient.get<{ user: User }>(
      `${environment.API_URL}/api/v1/auth/me`
    );
  }

  logout() {
    this.cookieService.delete('token');
    this.user$.next(null);
    this.router.navigate(['/']);
  }
}
