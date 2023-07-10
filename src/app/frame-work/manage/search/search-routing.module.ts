import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'searchMosh', loadChildren: () => import('./moshtarak/moshtarak.module').then(searchMoshtarakin => searchMoshtarakin.MoshtarakModule) },
  { path: 'acme', loadChildren: () => import('./pro/pro.module').then(proSearch => proSearch.ProModule) },
  { path: 'fwu', loadChildren: () => import('./follow-up/follow-up.module').then(followUp => followUp.FollowUpModule) },
  { path: 'simple', loadChildren: () => import('./simple/simple.module').then(simpleSearch => simpleSearch.SimpleModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
