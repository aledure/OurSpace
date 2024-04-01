// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, tap } from 'rxjs';
// import { User } from './user.model';
// import { Router } from '@angular/router';

// export interface AuthResponseData {
//   kind: string;
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string;
//   registered?: boolean;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   constructor(private http: HttpClient, private router: Router) {}

//   currentUser = new BehaviorSubject<User | null>(null);

//   // following line is edited
//   userToken: string | null = null;

//   signUp(email: string, password: string) {
//     return this.http
//       .post<AuthResponseData>(SIGN_UP_URL + AUTH_API_KEY, {
//         email,
//         password,
//         returnSecureToken: true,
//       })
//       .pipe(
//         tap((res) => {
//           const { email, localId, idToken, expiresIn } = res;
//           this.handleAuth(email, localId, idToken, +expiresIn);
//         })
//       );
//   }

//   signIn(email: string, password: string) {
//     return this.http
//       .post<AuthResponseData>(SIGN_IN_URL + AUTH_API_KEY, {
//         email,
//         password,
//         returnSecureToken: true,
//       })
//       .pipe(
//         tap((res) => {
//           const { email, localId, idToken, expiresIn } = res;
//           this.handleAuth(email, localId, idToken, +expiresIn);
//         })
//       );
//   }

//   handleAuth(email: string, userId: string, token: string, expiresIn: number) {
//     // Token Expiration
//     const expDate = new Date(new Date().getTime() + expiresIn * 1000);

//     // Create a new user based on the info passed in the form and emit that user
//     const formUser = new User(email, userId, token, expDate);
//     this.currentUser.next(formUser);

//     // Save the new user in localStorage
//     localStorage.setItem('userData', JSON.stringify(formUser));
//   }

//   signOut() {
//     this.currentUser.next(null);
//     this.router.navigate(['auth']);
//   }
// }
