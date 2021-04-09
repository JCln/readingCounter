import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QotrComponent } from './qotr.component';

const routes: Routes = [
  { path: '', component: QotrComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QotrRoutingModule { }
