import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FrameWorkComponent } from './frame-work/frame-work.component';


const routes: Routes = [
  {
    path: '', component: FrameWorkComponent , children: [
      { path: '', component: DashboardComponent },
      { path: 'foo', loadChildren: () => import('./foo/foo.module').then(foo => foo.FooModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WrapperRoutingModule { }
