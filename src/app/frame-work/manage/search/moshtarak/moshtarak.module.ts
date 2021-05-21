import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { MoshtarakRoutingModule } from './moshtarak-routing.module';
import { MoshtarakComponent } from './moshtarak.component';


@NgModule({
  declarations: [MoshtarakComponent],
  imports: [
    SharedModule,
    SharedPrimeNgModule,
    MoshtarakRoutingModule
  ]
})
export class MoshtarakModule { }
