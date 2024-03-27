import { NgModule } from '@angular/core';

import { ClientGetLazyRoutingModule } from './client-get-lazy-routing.module';
import { ClientGetLazyComponent } from './client-get-lazy.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { ClientLazyEditComponent } from './client-lazy-edit/client-lazy-edit.component';


@NgModule({
  declarations: [
    ClientGetLazyComponent,
    ClientLazyEditComponent
  ],
  imports: [
    SharedPrimeNgModule,
    ClientGetLazyRoutingModule
  ]
})
export class ClientGetLazyModule { }
