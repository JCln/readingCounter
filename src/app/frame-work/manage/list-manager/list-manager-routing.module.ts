import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'pd', loadChildren: () => import('./per-day/per-day.module').then(perday => perday.PerDayModule), data: { preload: true } },
  { path: 'all/false', loadChildren: () => import('./all/all.module').then(listManagerAll => listManagerAll.AllModule), data: { preload: true } },
  { path: 'all/true', loadChildren: () => import('./list-modify/list-modify.module').then(modifyList => modifyList.ListModifyModule), data: { preload: true } },
  { path: 'generalList', loadChildren: () => import('./general-list-modify/general-list-modify.module').then(generalInlineListModify => generalInlineListModify.GeneralListModifyModule), data: { preload: true } },
  { path: 'generalGList', loadChildren: () => import('./general-group-list-modify/general-group-list-modify.module').then(generalGroupListModify => generalGroupListModify.GeneralGroupListModifyModule), data: { preload: true } },
  { path: 'latestInfo', loadChildren: () => import('./list-latest-info/list-latest-info.module').then(listLatestOnOffloadInfo => listLatestOnOffloadInfo.ListLatestInfoModule), data: { preload: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListManagerRoutingModule { }
