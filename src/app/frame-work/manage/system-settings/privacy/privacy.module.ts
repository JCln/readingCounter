import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { PrivacyRoutingModule } from './privacy-routing.module';
import { PrivacyComponent } from './privacy.component';


@NgModule({
  declarations: [PrivacyComponent],
  imports: [
    SharedModule,
    PrivacyRoutingModule
  ]
})
export class PrivacyModule { }
