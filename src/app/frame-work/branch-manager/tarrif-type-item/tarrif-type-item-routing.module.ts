import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarrifTypeItemComponent } from './tarrif-type-item.component';

const routes: Routes = [
  { path: '', component: TarrifTypeItemComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarrifTypeItemRoutingModule { }
