import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'txtout', loadChildren: () => import('./off-txt-out/off-txt-out.module').then(offlineTextOut => offlineTextOut.OffTxtOutModule) },
  { path: 'load', loadChildren: () => import('./off-load/off-load.module').then(offlineLoad => offlineLoad.OffLoadModule) },
  { path: 'read', loadChildren: () => import('./single-reading-counter/single-reading-counter.module').then(offlineSingleReadingCounter => offlineSingleReadingCounter.SingleReadingCounterModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfflineModeRoutingModule { }
