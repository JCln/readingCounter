import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OffloadedComponent } from './offloaded.component';

const routes: Routes = [
  {
    path: '', component: OffloadedComponent, children: [
      { path: 'offloadMfy/:UUID', loadChildren: () => import('./offload/offload.module').then(offloadModify => offloadModify.OffloadModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffloadedRoutingModule { }
