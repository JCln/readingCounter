import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestDraftRoutingModule } from './request-draft-routing.module';
import { RequestDraftComponent } from './request-draft.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { LocationComponent } from './location/location.component';
import { OtherInfoComponent } from './other-info/other-info.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { TechnicalComponent } from './technical/technical.component';
import { DescriptionComponent } from './description/description.component';


@NgModule({
  declarations: [
    RequestDraftComponent,
    ConfirmationComponent,
    LocationComponent,
    OtherInfoComponent,
    PersonalInfoComponent,
    TechnicalComponent,
    DescriptionComponent
  ],
  imports: [
    CommonModule,
    RequestDraftRoutingModule
  ]
})
export class RequestDraftModule { }
