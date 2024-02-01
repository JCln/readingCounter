import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleMasterByFragmentComponent } from './simple-master-by-fragment.component';

const routes: Routes = [
  { path: '', component: SimpleMasterByFragmentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimpleMasterByFragmentRoutingModule { }
