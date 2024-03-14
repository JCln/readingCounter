import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPreviousloginsComponent } from './my-previouslogins.component';

const routes: Routes = [
  { path: '', component: MyPreviousloginsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPreviousloginsRoutingModule { }
