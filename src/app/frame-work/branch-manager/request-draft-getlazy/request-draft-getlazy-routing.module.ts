import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestDraftGetlazyComponent } from './request-draft-getlazy.component';

const routes: Routes = [
  { path: '', component: RequestDraftGetlazyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestDraftGetlazyRoutingModule { }
