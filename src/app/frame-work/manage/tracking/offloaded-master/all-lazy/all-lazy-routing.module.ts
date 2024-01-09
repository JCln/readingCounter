import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllLazyComponent } from './all-lazy.component';

const routes: Routes = [
  { path: '', component: AllLazyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllLazyRoutingModule { }
