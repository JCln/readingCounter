import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { OffloadRoutingModule } from './offload-routing.module';
import { OffloadComponent } from './offload.component';


@NgModule({
  declarations: [OffloadComponent],
  imports: [
    SharedModule,
    SharedThreeModule,
    OffloadRoutingModule
  ]
})
export class OffloadModule { }
