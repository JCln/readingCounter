import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllIngroupLazyComponent } from './all-ingroup-lazy.component';

const routes: Routes = [
  { path: '', component: AllIngroupLazyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllIngroupLazyRoutingModule { }
