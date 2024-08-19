import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExcelToFillComponent } from './excel-to-fill.component';

const routes: Routes = [
  { path: '', component: ExcelToFillComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExcelToFillRoutingModule { }
