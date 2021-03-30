import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'master', loadChildren: () => import('./master/master.module').then(master => master.MasterModule) },
  { path: 'details', loadChildren: () => import('./details/details.module').then(details => details.DetailsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
