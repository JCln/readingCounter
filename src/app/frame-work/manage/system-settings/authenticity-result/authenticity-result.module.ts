import { NgModule } from '@angular/core';
import { AuthenticityBriefRoutingModule } from './authenticity-result-routing.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { AuthenticityResultComponent } from './authenticity-result.component';


@NgModule({
  declarations: [
    AuthenticityResultComponent
  ],
  imports: [
    SharedPrimeNgModule,
    AuthenticityBriefRoutingModule
  ]
})
export class AuthenticityBriefModule { }
