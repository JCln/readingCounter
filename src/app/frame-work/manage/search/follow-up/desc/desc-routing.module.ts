import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DescComponent } from './desc.component';

const routes: Routes = [
  { path: '', component: DescComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DescRoutingModule { }
