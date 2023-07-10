import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExcelBuilderComponent } from './excel-builder.component';

const routes: Routes = [
  { path: '', component: ExcelBuilderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExcelBuilderRoutingModule { }
