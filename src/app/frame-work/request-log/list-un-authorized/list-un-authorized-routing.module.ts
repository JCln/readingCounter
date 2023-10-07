import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUnAuthorizedComponent } from './list-un-authorized.component';

const routes: Routes = [
  { path: '', component: ListUnAuthorizedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListUnAuthorizedRoutingModule { }
