import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterByFragmentAllInGroupLazyComponent } from './master-by-fragment-all-in-group-lazy.component';

const routes: Routes = [
  { path: '', component: MasterByFragmentAllInGroupLazyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterByFragmentAllInGroupLazyRoutingModule { }
