import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RrExcelDynamicViewerComponent } from './rr-excel-dynamic-viewer.component';

const routes: Routes = [
  { path: '', component: RrExcelDynamicViewerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RrExcelDynamicViewerRoutingModule { }
