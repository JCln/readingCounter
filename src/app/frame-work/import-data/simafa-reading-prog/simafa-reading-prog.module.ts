import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { SimafaReadingProgRoutingModule } from './simafa-reading-prog-routing.module';
import { SimafaReadingProgComponent } from './simafa-reading-prog.component';


@NgModule({
  declarations: [SimafaReadingProgComponent],
  imports: [
    SharedPrimeNgModule,
    SharedThreeModule,
    SharedModule,
    SimafaReadingProgRoutingModule
  ]
})
export class SimafaReadingProgModule { }
