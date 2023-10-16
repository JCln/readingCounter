import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IpFilterComponent } from './ip-filter.component';

const routes: Routes = [
  { path: '', component: IpFilterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpFilterRoutingModule { }
