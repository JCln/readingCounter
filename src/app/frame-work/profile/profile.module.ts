import { NgModule } from '@angular/core';
import { SharedTwoModule } from 'src/app/shared/shared-two.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    SharedTwoModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
