import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferingComponent } from './offering.component';

const routes: Routes = [
  { path: '', component: OfferingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferingRoutingModule { }
