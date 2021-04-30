import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { UserLogginsRoutingModule } from './user-loggins-routing.module';
import { UserLogginsComponent } from './user-loggins.component';


@NgModule({
  declarations: [UserLogginsComponent],
  imports: [
    SharedPrimeNgModule,
    UserLogginsRoutingModule
  ]
})
export class UserLogginsModule { }
