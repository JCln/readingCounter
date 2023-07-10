import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExcelFileComponent } from './excel-file.component';

const routes: Routes = [
  { path: '', component: ExcelFileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExcelFileRoutingModule { }
