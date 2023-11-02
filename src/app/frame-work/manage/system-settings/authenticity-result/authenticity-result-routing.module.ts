import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticityResultComponent } from './authenticity-result.component';

const routes: Routes = [
  { path: '', component: AuthenticityResultComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticityBriefRoutingModule { }
