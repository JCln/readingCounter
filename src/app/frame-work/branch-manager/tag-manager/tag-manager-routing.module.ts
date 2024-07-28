import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagManagerComponent } from './tag-manager.component';

const routes: Routes = [
  { path: '', component: TagManagerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagManagerRoutingModule { }
