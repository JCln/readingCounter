import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticityBriefComponent } from './authenticity-brief.component';

const routes: Routes = [
  { path: '', component: AuthenticityBriefComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticityBriefRoutingModule { }
