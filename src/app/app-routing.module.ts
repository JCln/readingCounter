import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { GuardService } from './auth/guard.service';
import { LoginComponent } from './auth/login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: AppComponent, canActivate: [GuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
