import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WouiComponent } from './woui.component';


const routes: Routes = [
  { path: '', component: WouiComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbDanUploadedInfoRoutingModule { }
