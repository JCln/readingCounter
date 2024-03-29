import { NgModule } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { ProRoutingModule } from './pro-routing.module';
import { ProComponent } from './pro.component';

@NgModule({
  declarations: [ProComponent],
  imports: [
    SharedModule,
    SharedPrimeNgModule,
    SharedThreeModule,
    ProRoutingModule
  ],
  providers: [DialogService]
})
export class ProModule { }
