import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AbDanUploadedInfoComponent } from './ab-dan-uploaded-info.component';

const routes: Routes = [
  { path: '', component: AbDanUploadedInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbDanUploadedInfoRoutingModule { }
