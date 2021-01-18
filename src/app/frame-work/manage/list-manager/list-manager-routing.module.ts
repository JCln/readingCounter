import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'pd/:trackNumber', loadChildren: () => import('./per-day/per-day.module').then(perday => perday.PerDayModule) },
  { path: 'pdxy', loadChildren: () => import('./per-day-xy/per-day-xy.module').then(perDayXY => perDayXY.PerDayXYModule) },
  { path: 'all', loadChildren: () => import('./all/all.module').then(listManagerAll => listManagerAll.AllModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListManagerRoutingModule { }
