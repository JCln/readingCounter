import { NgModule } from '@angular/core';

import { IpfilterGetblockedRoutingModule } from './ipfilter-getblocked-routing.module';
import { IpfilterGetblockedComponent } from './ipfilter-getblocked.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedCollapseModule } from 'src/app/shared/shared-collapse.module';

@NgModule({
  declarations: [
    IpfilterGetblockedComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedCollapseModule,
    IpfilterGetblockedRoutingModule
  ]
})
export class IpfilterGetblockedModule { }
