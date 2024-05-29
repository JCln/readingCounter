import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiphonComponent } from './siphon.component';

const routes: Routes = [
  { path: '', component: SiphonComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiphonRoutingModule { }
