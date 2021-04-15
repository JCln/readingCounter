import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { ForbiddenRoutingModule } from './forbidden-routing.module';
import { ForbiddenComponent } from './forbidden.component';


@NgModule({
  declarations: [ForbiddenComponent],
  imports: [
    SharedModule,
    SharedThreeModule,
    ForbiddenRoutingModule
  ]
})
export class ForbiddenModule { }
