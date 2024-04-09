import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutomaticImportComponent } from './automatic-import.component';

const routes: Routes = [
  { path: '', component: AutomaticImportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomaticImportRoutingModule { }
