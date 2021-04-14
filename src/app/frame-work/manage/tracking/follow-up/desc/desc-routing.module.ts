import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DescComponent } from './desc.component';

const routes: Routes = [
  {
    path: '', component: DescComponent, children: [
      { path: ':tele', loadChildren: () => import('./time-line/time-line.module').then(timeLine => timeLine.TimeLineModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DescRoutingModule { }
