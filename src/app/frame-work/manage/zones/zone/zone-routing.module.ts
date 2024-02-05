import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ZoneComponent } from './zone.component';

const routes: Routes = [
  { path: '', component: ZoneComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZoneRoutingModule { }
