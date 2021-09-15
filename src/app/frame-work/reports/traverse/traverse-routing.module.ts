import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TraverseComponent } from './traverse.component';

const routes: Routes = [
  { path: '', component: TraverseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraverseRoutingModule { }
