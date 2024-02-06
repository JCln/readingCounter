import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffloadedMasterComponent } from './offloaded-master.component';

const routes: Routes = [
  { path: '', component: OffloadedMasterComponent },
  { path: 'allLazy', loadChildren: () => import('./all-lazy/all-lazy.module').then(listAllLazy => listAllLazy.AllLazyModule), data: { preload: true } },
  { path: 'allInGroupLazy', loadChildren: () => import('./all-ingroup-lazy/all-ingroup-lazy.module').then(allInGroupLazy => allInGroupLazy.AllIngroupLazyModule), data: { preload: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffloadedMasterRoutingModule { }
