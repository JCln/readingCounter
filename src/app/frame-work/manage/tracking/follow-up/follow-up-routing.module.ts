import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FollowUpComponent } from './follow-up.component';

const routes: Routes = [
  {
    path: '', component: FollowUpComponent, children: [
      { path: 'desc', loadChildren: () => import('./desc/desc.module').then(detailOfApiCall => detailOfApiCall.DescModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FollowUpRoutingModule { }
