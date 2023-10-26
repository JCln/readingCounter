import { NgModule } from '@angular/core';
import { AuthenticityBriefRoutingModule } from './authenticity-brief-routing.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { AuthenticityBriefComponent } from './authenticity-brief.component';


@NgModule({
  declarations: [
    AuthenticityBriefComponent
  ],
  imports: [
    SharedPrimeNgModule,
    AuthenticityBriefRoutingModule
  ]
})
export class AuthenticityBriefModule { }
