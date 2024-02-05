import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'searchMosh', loadChildren: () => import('./moshtarak/moshtarak.module').then(searchMoshtarakin => searchMoshtarakin.MoshtarakModule), data: { preload: true } },
  { path: 'acme', loadChildren: () => import('./pro/pro.module').then(proSearch => proSearch.ProModule), data: { preload: true } },
  { path: 'fwu', loadChildren: () => import('./follow-up/follow-up.module').then(followUp => followUp.FollowUpModule), data: { preload: true } },
  { path: 'simple', loadChildren: () => import('./simple/simple.module').then(simpleSearch => simpleSearch.SimpleModule), data: { preload: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
