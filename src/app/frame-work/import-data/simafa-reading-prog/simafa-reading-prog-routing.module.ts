import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SimafaReadingProgComponent } from './simafa-reading-prog.component';

const routes: Routes = [
  {
    path: '', component: SimafaReadingProgComponent, children: [
      { path: 'single', loadChildren: () => import('./simafa-single/simafa-single.module').then(simafaSingle => simafaSingle.SimafaSingleModule) },
      { path: 'batch', loadChildren: () => import('./simafa-batch/simafa-batch.module').then(simafaBatch => simafaBatch.SimafaBatchModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimafaReadingProgRoutingModule { }
