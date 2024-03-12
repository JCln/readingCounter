import { NgModule } from '@angular/core';

import { ClientManagerAddRoutingModule } from './client-manager-add-routing.module';
import { ClientManagerAddComponent } from './client-manager-add.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    ClientManagerAddComponent
  ],
  imports: [
    SharedPrimeNgModule,
    ClientManagerAddRoutingModule
  ]
})
export class ClientManagerAddModule { }
