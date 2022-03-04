import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'pd/:trackNumber', loadChildren: () => import('./per-day/per-day.module').then(perday => perday.PerDayModule) },
  { path: 'all/false', loadChildren: () => import('./all/all.module').then(listManagerAll => listManagerAll.AllModule) },
  { path: 'all/true', loadChildren: () => import('./all/all.module').then(listManagerAll => listManagerAll.AllModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListManagerRoutingModule { }
