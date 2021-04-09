import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DbfOutputComponent } from './dbf-output.component';

const routes: Routes = [
  { path: '', component: DbfOutputComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbfOutputRoutingModule { }
