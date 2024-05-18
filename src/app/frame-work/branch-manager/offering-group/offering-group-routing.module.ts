import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferingGroupComponent } from './offering-group.component';

const routes: Routes = [
  { path: '', component: OfferingGroupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferingGroupRoutingModule { }
