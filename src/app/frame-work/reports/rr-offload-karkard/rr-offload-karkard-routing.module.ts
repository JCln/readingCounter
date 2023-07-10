import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RrOffloadKarkardComponent } from './rr-offload-karkard.component';

const routes: Routes = [
  { path: '', component: RrOffloadKarkardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RrOffloadKarkardRoutingModule { }
