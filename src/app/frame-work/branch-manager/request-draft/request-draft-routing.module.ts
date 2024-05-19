import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestDraftComponent } from './request-draft.component';

const routes: Routes = [
  { path: '', component: RequestDraftComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestDraftRoutingModule { }
