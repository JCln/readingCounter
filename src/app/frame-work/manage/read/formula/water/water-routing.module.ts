import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WaterComponent } from './water.component';

const routes: Routes = [
  { path: '', component: WaterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaterRoutingModule { }
