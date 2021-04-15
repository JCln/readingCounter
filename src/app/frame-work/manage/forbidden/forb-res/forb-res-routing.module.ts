import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForbResComponent } from './forb-res.component';

const routes: Routes = [
  { path: '', component: ForbResComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForbResRoutingModule { }
