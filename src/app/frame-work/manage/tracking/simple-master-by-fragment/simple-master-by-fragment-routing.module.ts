import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleMasterByFragmentComponent } from './simple-master-by-fragment.component';

const routes: Routes = [
  { path: '', component: SimpleMasterByFragmentComponent },
  { path: 'masterAll', loadChildren: () => import('./master-by-fragment-all-lazy/master-by-fragment-all-lazy.module').then(masterByFragmentAllLazy => masterByFragmentAllLazy.MasterByFragmentAllLazyModule) },
  { path: 'masterAllGroup', loadChildren: () => import('./master-by-fragment-all-in-group-lazy/master-by-fragment-all-in-group-lazy.module').then(masterByFragmentAllInGroupLazy => masterByFragmentAllInGroupLazy.MasterByFragmentAllInGroupLazyModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimpleMasterByFragmentRoutingModule { }
