import { NgModule } from '@angular/core';

import { TarrifTypeItemRoutingModule } from './tarrif-type-item-routing.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { TarriftypeAddDgComponent } from './tarriftype-add-dg/tarriftype-add-dg.component';
import { TarrifTypeItemComponent } from './tarrif-type-item.component';


@NgModule({
  declarations: [
    TarrifTypeItemComponent,
    TarriftypeAddDgComponent
  ],
  imports: [
    SharedPrimeNgModule,
    TarrifTypeItemRoutingModule
  ]
})
export class TarrifTypeItemModule { }
