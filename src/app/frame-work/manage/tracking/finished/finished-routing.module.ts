import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FinishedComponent } from './finished.component';

const routes: Routes = [
  { path: '', component: FinishedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinishedRoutingModule { }
