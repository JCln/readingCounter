import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IpfilterGetInvalidTimeComponent } from './ipfilter-get-invalid-time.component';

const routes: Routes = [
  { path: '', component: IpfilterGetInvalidTimeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpfilterGetInvalidTimeRoutingModule { }
