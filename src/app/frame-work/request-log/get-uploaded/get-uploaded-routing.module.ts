import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetUploadedComponent } from './get-uploaded.component';

const routes: Routes = [
  { path: '', component: GetUploadedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetUploadedRoutingModule { }
