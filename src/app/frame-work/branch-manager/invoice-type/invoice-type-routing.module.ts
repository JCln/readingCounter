import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceTypeComponent } from './invoice-type.component';

const routes: Routes = [
  { path: '', component: InvoiceTypeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceTypeRoutingModule { }
