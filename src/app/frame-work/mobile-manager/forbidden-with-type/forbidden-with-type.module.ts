import { NgModule } from '@angular/core';

import { ForbiddenWithTypeRoutingModule } from './forbidden-with-type-routing.module';
import { ForbiddenWithTypeComponent } from './forbidden-with-type.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ForbiddenWithTypeComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedThreeModule,
    ForbiddenWithTypeRoutingModule
  ]
})
export class ForbiddenWithTypeModule { }
