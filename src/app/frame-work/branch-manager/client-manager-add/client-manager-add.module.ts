import { NgModule } from '@angular/core';

import { ClientManagerAddRoutingModule } from './client-manager-add-routing.module';
import { ClientManagerAddComponent } from './client-manager-add.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { OtherInfoComponent } from './other-info/other-info.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { DescriptionComponent } from './description/description.component';
import { LocationComponent } from './location/location.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { TechnicalComponent } from './technical/technical.component';


@NgModule({
  declarations: [
    ClientManagerAddComponent,
    OtherInfoComponent,
    PersonalInfoComponent,
    DescriptionComponent,
    LocationComponent,
    ConfirmationComponent,
    TechnicalComponent
  ],
  imports: [
    SharedPrimeNgModule,
    ClientManagerAddRoutingModule
  ]
})
export class ClientManagerAddModule { }
