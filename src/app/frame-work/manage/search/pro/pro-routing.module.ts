import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProComponent } from './pro.component';

const routes: Routes = [
  { path: '', component: ProComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProRoutingModule { }
