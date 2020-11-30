import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: 'db', component: DashboardComponent }
  // { path: 'db', loadChildren: () => import('./dashboard/dashboard.module').then(dashboard => dashboard.DashboardModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
