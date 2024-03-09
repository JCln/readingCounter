import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerTypeComponent } from './customer-type.component';

const routes: Routes = [
  { path: '', component: CustomerTypeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerTypeRoutingModule { }
