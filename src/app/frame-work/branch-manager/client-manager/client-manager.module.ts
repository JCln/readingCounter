import { NgModule } from '@angular/core';

import { ClientManagerRoutingModule } from './client-manager-routing.module';
import { ClientManagerComponent } from './client-manager.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    ClientManagerComponent
  ],
  imports: [
    SharedPrimeNgModule,
    ClientManagerRoutingModule
  ]
})
export class ClientManagerModule { }
