import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImportDynamicComponent } from './import-dynamic.component';

const routes: Routes = [
  { path: '', component: ImportDynamicComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportDynamicRoutingModule { }
