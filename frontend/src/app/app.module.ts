import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../shared/interceptors/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { UserService } from 'src/shared/services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory:
        (cookieService: CookieService, userService: UserService) => () => {
          return new Promise<void>((resolve, reject) => {
            if (cookieService.check('token')) {
              userService.me().subscribe(
                (response) => {
                  userService.setUser(response.user);
                  resolve();
                },
                (error) => {
                  // Handle error if the me() call fails
                  console.error('Error fetching user information:', error);
                  resolve(); // Resolve even if there's an error to ensure the app starts
                }
              );
            } else {
              resolve(); // No token, resolve immediately
            }
          });
        },
      deps: [CookieService, UserService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
