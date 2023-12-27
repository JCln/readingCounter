import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffloadedMasterComponent } from './offloaded-master.component';

const routes: Routes = [
  { path: '', component: OffloadedMasterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffloadedMasterRoutingModule { }
