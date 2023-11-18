import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticityAttemptsComponent } from './authenticity-attempts.component';

const routes: Routes = [
  { path: '', component: AuthenticityAttemptsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticityAttemptsRoutingModule { }
