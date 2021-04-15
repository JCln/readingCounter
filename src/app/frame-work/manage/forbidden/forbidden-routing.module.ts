import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForbiddenComponent } from './forbidden.component';

const routes: Routes = [
  {
    path: '', component: ForbiddenComponent, children: [
      { path: 'res', loadChildren: () => import('./forb-res/forb-res.module').then(forbiddenRes => forbiddenRes.ForbResModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForbiddenRoutingModule { }
