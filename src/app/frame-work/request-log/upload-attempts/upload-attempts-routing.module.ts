import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadAttemptsComponent } from './upload-attempts.component';

const routes: Routes = [
  { path: '', component: UploadAttemptsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadAttemptsRoutingModule { }
