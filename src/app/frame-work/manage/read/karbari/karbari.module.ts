import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { KarbariAddDgComponent } from './karbari-add-dg/karbari-add-dg.component';
import { KarbariRoutingModule } from './karbari-routing.module';
import { KarbariComponent } from './karbari.component';


@NgModule({
  declarations: [KarbariComponent, KarbariAddDgComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    KarbariRoutingModule
  ]
})
export class KarbariModule { }
