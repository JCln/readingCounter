import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OffLoadComponent } from './off-load.component';

const routes: Routes = [
  { path: '', component: OffLoadComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffLoadRoutingModule { }
