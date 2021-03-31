import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KarkardComponent } from './karkard.component';

const routes: Routes = [
  { path: '', component: KarkardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KarkardRoutingModule { }
