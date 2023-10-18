import { NgModule } from '@angular/core';
import { UserCompareRoutingModule } from './user-compare-routing.module';
import { RlUsSelectInputComponent } from './rl-us-select-input/rl-us-select-input.component';
import { RlUsSelectZoneComponent } from './rl-us-select-zone/rl-us-select-zone.component';
import { UserCompareComponent } from './user-compare.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RlUsSelectActionComponent } from './rl-us-select-action/rl-us-select-action.component';


@NgModule({
  declarations: [
    RlUsSelectInputComponent,
    RlUsSelectZoneComponent,
    UserCompareComponent,
    RlUsSelectActionComponent
  ],
  imports: [
    SharedModule,
    UserCompareRoutingModule
  ]
})
export class UserCompareModule { }
