import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedCarouselModule } from 'src/app/shared/shared_carousel';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { RrPreNumberShownRoutingModule } from './rr-pre-number-shown-routing.module';
import { RrPreNumberShownComponent } from './rr-pre-number-shown.component';


@NgModule({
  declarations: [
    RrPreNumberShownComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedThreeModule,
    SharedCarouselModule,
    RrPreNumberShownRoutingModule
  ]
})
export class RrPreNumberShownModule { }
