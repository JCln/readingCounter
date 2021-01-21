import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DescComponent } from './desc/desc.component';
import { FollowUpComponent } from './follow-up.component';

const routes: Routes = [
  {
    path: '', component: FollowUpComponent, children: [
      { path: ':trackNumber', component: DescComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FollowUpRoutingModule { }
