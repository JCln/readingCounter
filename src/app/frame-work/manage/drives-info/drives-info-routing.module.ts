import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DrivesInfoComponent } from './drives-info.component';

const routes: Routes = [
  { path: '', component: DrivesInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrivesInfoRoutingModule { }
