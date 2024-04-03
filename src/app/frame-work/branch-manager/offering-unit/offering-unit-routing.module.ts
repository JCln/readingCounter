import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferingUnitComponent } from './offering-unit.component';

const routes: Routes = [
  { path: '', component: OfferingUnitComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferingUnitRoutingModule { }
