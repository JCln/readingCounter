import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SimpleComponent } from './simple.component';

const routes: Routes = [
  { path: '', component: SimpleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimpleRoutingModule { }
