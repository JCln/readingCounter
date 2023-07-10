import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedConfirmsModule } from 'src/app/shared/shared_confirms';

import { MoshtarakRoutingModule } from './moshtarak-routing.module';
import { MoshtarakComponent } from './moshtarak.component';


@NgModule({
  declarations: [MoshtarakComponent],
  imports: [
    SharedModule,
    SharedPrimeNgModule,
    SharedConfirmsModule,
    MoshtarakRoutingModule
  ]
})
export class MoshtarakModule { }
