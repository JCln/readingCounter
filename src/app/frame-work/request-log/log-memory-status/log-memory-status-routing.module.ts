import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogMemoryStatusComponent } from './log-memory-status.component';

const routes: Routes = [
  { path: '', component: LogMemoryStatusComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogMemoryStatusRoutingModule { }
