import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LicenseComponent } from './license.component';

const routes: Routes = [
  { path: '', component: LicenseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenseRoutingModule { }
