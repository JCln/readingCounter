import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DbfOutputEqamatBaghComponent } from './dbf-output-eqamat-bagh.component';

const routes: Routes = [
  { path: '', component: DbfOutputEqamatBaghComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbfOutputEqamatBaghRoutingModule { }
