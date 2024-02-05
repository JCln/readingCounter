import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterByFragmentAllLazyComponent } from './master-by-fragment-all-lazy.component';

const routes: Routes = [
  { path: '', component: MasterByFragmentAllLazyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterByFragmentAllLazyRoutingModule { }
