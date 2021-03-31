import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'exm/master', loadChildren: () => import('./master/master.module').then(master => master.MasterModule) },
  { path: 'exm/details', loadChildren: () => import('./details/details.module').then(details => details.DetailsModule) },
  { path: 'mam/trv', loadChildren: () => import('./traverse/traverse.module').then(traverse => traverse.TraverseModule) },
  { path: 'mam/karkard', loadChildren: () => import('./karkard/karkard.module').then(karkard => karkard.KarkardModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
