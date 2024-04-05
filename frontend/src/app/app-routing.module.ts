import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: AppComponent },
  { path: 'profile', component: AppComponent },
  { path: 'following', component: AppComponent },
  { path: 'links', component: AppComponent },
  { path: 'notifications', component: AppComponent },
  { path: 'messages', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
