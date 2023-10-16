import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IpfilterGetblockedComponent } from './ipfilter-getblocked.component';

const routes: Routes = [
  { path: '', component: IpfilterGetblockedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpfilterGetblockedRoutingModule { }
