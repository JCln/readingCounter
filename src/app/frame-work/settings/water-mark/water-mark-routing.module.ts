import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WaterMarkComponent } from './water-mark.component';

const routes: Routes = [
  { path: '', component: WaterMarkComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaterMarkRoutingModule { }
