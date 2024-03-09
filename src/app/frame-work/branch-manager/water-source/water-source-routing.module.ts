import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaterSourceComponent } from './water-source.component';

const routes: Routes = [
  { path: '', component: WaterSourceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaterSourceRoutingModule { }
