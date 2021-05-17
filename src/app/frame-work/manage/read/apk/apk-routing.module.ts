import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApkComponent } from './apk.component';

const routes: Routes = [
  { path: '', component: ApkComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApkRoutingModule { }
