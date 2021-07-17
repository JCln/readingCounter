import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssessAddComponent } from './assess-add.component';

const routes: Routes = [
  { path: '', component: AssessAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessAddRoutingModule { }
