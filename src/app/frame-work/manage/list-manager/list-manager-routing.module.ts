import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'pd', loadChildren: () => import('./per-day/per-day.module').then(perday => perday.PerDayModule) },
  { path: 'all/false', loadChildren: () => import('./all/all.module').then(listManagerAll => listManagerAll.AllModule) },
  { path: 'all/true', loadChildren: () => import('./list-modify/list-modify.module').then(modifyList => modifyList.ListModifyModule) },
  { path: 'generalList', loadChildren: () => import('./general-list-modify/general-list-modify.module').then(generalInlineListModify => generalInlineListModify.GeneralListModifyModule) },
  { path: 'generalGList', loadChildren: () => import('./general-group-list-modify/general-group-list-modify.module').then(generalGroupListModify => generalGroupListModify.GeneralGroupListModifyModule) },
  { path: 'latestInfo', loadChildren: () => import('./list-latest-info/list-latest-info.module').then(listLatestOnOffloadInfo => listLatestOnOffloadInfo.ListLatestInfoModule) },
  { path: 'allLazy', loadChildren: () => import('./all-lazy/all-lazy.module').then(listAllLazy => listAllLazy.AllLazyModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListManagerRoutingModule { }
