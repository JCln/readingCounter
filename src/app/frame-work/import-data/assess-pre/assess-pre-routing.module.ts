import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssessPreComponent } from './assess-pre.component';

const routes: Routes = [
  { path: '', component: AssessPreComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessPreRoutingModule { }
