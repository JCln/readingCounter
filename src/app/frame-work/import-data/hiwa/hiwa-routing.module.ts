import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HiwaComponent } from './hiwa.component';

const routes: Routes = [
  { path: '', component: HiwaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HiwaRoutingModule { }
