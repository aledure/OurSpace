import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { AuthGuard } from './shared/auth/auth-guard/auth-guard.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
=======
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
>>>>>>> master
  exports: [RouterModule],
})
export class AppRoutingModule {}
