import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InactiveEntityComponent } from './inactive-entity.component';

const routes: Routes = [
  { path: '', component: InactiveEntityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InactiveEntityRoutingModule { }
