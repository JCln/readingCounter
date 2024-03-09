import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnershipTypeComponent } from './ownership-type.component';

const routes: Routes = [
  { path: '', component: OwnershipTypeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnershipTypeRoutingModule { }
