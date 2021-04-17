import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PerformanceComponent } from './performance.component';

const routes: Routes = [
  {
    path: '', component: PerformanceComponent, children: [
      { path: 'res', loadChildren: () => import('./prfm-res/prfm-res.module').then(performanceRes => performanceRes.PrfmResModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceRoutingModule { }
