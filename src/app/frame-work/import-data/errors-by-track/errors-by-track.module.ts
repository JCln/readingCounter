import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { ErrorsByTrackRoutingModule } from './errors-by-track-routing.module';
import { ErrorsByTrackComponent } from './errors-by-track.component';


@NgModule({
  declarations: [
    ErrorsByTrackComponent
  ],
  imports: [
    SharedPrimeNgModule,
    ErrorsByTrackRoutingModule
  ]
})
export class ErrorsByTrackModule { }
