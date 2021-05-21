import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoshtarakComponent } from './moshtarak.component';

const routes: Routes = [
  { path: '', component: MoshtarakComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoshtarakRoutingModule { }
