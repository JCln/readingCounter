import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { ForbiddenRoutingModule } from './forbidden-routing.module';
import { ForbiddenComponent } from './forbidden.component';


@NgModule({
  declarations: [ForbiddenComponent],
  imports: [
    SharedPrimeNgModule,
    ForbiddenRoutingModule
  ]
})
export class ForbiddenModule { }
