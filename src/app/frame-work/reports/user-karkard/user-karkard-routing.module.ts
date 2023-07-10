import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserKarkardComponent } from './user-karkard.component';

const routes: Routes = [
  { path: '', component: UserKarkardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserKarkardRoutingModule { }
