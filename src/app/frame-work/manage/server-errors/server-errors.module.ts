import { NgModule } from '@angular/core';
import { SharedCollapseModule } from 'src/app/shared/shared-collapse.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { ServerErrorsRoutingModule } from './server-errors-routing.module';
import { ServerErrorsComponent } from './server-errors.component';


@NgModule({
  declarations: [
    ServerErrorsComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedCollapseModule,
    ServerErrorsRoutingModule
  ]
})
export class ServerErrorsModule { }
