import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { ErrorsRoutingModule } from './errors-routing.module';
import { ErrorsComponent } from './errors.component';


@NgModule({
  declarations: [
    ErrorsComponent
  ],
  imports: [
    SharedPrimeNgModule,
    ErrorsRoutingModule
  ]
})
export class ErrorsModule { }
