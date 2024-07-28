import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZoneConstantComponent } from './zone-constant.component';

const routes: Routes = [
  { path: '', component: ZoneConstantComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZoneConstantRoutingModule { }
