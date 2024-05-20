import { NgModule } from '@angular/core';

import { RequestDraftRoutingModule } from './request-draft-routing.module';
import { RequestDraftComponent } from './request-draft.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { LocationComponent } from './location/location.component';
import { OtherInfoComponent } from './other-info/other-info.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { TechnicalComponent } from './technical/technical.component';
import { DescriptionComponent } from './description/description.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { OfferingGroupComponent } from './offering-group/offering-group.component';


@NgModule({
  declarations: [
    RequestDraftComponent,
    ConfirmationComponent,
    LocationComponent,
    OtherInfoComponent,
    PersonalInfoComponent,
    TechnicalComponent,
    DescriptionComponent,
    OfferingGroupComponent
  ],
  imports: [
    SharedPrimeNgModule,
    RequestDraftRoutingModule
  ]
})
export class RequestDraftModule { }
