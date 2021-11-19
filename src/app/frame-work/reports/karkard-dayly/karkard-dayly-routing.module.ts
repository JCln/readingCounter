import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KarkardDaylyComponent } from './karkard-dayly.component';

const routes: Routes = [
  { path: '', component: KarkardDaylyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KarkardDaylyRoutingModule { }
