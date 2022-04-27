import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'lr', loadChildren: () => import('./latest-reads/latest-reads.module').then(latestReads => latestReads.LatestReadsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MomentSystemRoutingModule { }
