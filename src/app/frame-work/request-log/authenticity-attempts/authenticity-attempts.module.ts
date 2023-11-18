import { NgModule } from '@angular/core';

import { AuthenticityAttemptsRoutingModule } from './authenticity-attempts-routing.module';
import { AuthenticityAttemptsComponent } from './authenticity-attempts.component';
import { SharedCollapseModule } from 'src/app/shared/shared-collapse.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    AuthenticityAttemptsComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedCollapseModule,
    AuthenticityAttemptsRoutingModule
  ]
})
export class AuthenticityAttemptsModule { }
