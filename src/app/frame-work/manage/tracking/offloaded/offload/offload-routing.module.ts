import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OffloadComponent } from './offload.component';

const routes: Routes = [
  { path: '', component: OffloadComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffloadRoutingModule { }
