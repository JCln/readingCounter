import { NgModule } from '@angular/core';
import { SharedTwoModule } from 'src/app/shared/shared-two.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedChangePassModule } from 'src/app/shared/shared-change-pass.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    SharedTwoModule,    
    SharedChangePassModule,
    SharedPrimeNgModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
