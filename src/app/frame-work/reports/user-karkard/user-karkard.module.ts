import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { UserKarkardRoutingModule } from './user-karkard-routing.module';
import { UserKarkardComponent } from './user-karkard.component';


@NgModule({
  declarations: [
    UserKarkardComponent
  ],
  imports: [
    SharedModule,
    SharedThreeModule,
    SharedPrimeNgModule,
    UserKarkardRoutingModule
  ]
})
export class UserKarkardModule { }
