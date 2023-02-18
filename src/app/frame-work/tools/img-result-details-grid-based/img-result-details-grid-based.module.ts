import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { ImgResultDetailsGridBasedRoutingModule } from './img-result-details-grid-based-routing.module';
import { ImgResultDetailsGridBasedComponent } from './img-result-details-grid-based.component';


@NgModule({
  declarations: [ImgResultDetailsGridBasedComponent],
  imports: [
    SharedPrimeNgModule,
    SharedThreeModule,
    ImgResultDetailsGridBasedRoutingModule
  ]
})
export class ImgResultDetailsGridBasedModule { }
