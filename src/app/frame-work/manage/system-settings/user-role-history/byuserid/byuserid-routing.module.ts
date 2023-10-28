import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ByuseridComponent } from './byuserid.component';

const routes: Routes = [
  { path: '', component: ByuseridComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ByuseridRoutingModule { }
