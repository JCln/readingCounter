import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLatestInfoComponent } from './list-latest-info.component';

const routes: Routes = [
  { path: '', component: ListLatestInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListLatestInfoRoutingModule { }
