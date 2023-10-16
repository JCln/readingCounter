import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IpFilterHistoryComponent } from './ip-filter-history.component';

const routes: Routes = [
  { path: '', component: IpFilterHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpFilterHistoryRoutingModule { }
