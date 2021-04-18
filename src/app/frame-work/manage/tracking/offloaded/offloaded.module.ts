import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { OffloadedRoutingModule } from './offloaded-routing.module';
import { OffloadedComponent } from './offloaded.component';

@NgModule({
  declarations: [OffloadedComponent],
  imports: [
    SharedPrimeNgModule,
    OffloadedRoutingModule
  ]
})
export class OffloadedModule { }
