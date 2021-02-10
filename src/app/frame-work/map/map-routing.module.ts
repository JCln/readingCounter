import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from './map.component';

const routes: Routes = [
  {
    path: '', component: MapComponent, children: [
      { path: 'db', loadChildren: () => import('./dashboard/dashboard.module').then(dashboard => dashboard.DashboardModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
