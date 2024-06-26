import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from '../shared/auth.guard';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'following', component: AppComponent, canActivate: [AuthGuard] },
  { path: 'links', component: AppComponent },
  { path: 'notifications', component: AppComponent, canActivate: [AuthGuard] },
  { path: 'messages', component: AppComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
