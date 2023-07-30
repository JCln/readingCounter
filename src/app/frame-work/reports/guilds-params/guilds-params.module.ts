import { NgModule } from '@angular/core';
import { GuildsParamsRoutingModule } from './guilds-params-routing.module';
import { GuildsParamsComponent } from './guilds-params.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedSortByModule } from 'src/app/shared/shared-sort-by';


@NgModule({
  declarations: [
    GuildsParamsComponent
  ],
  imports: [
    SharedModule,
    SharedThreeModule,
    SharedPrimeNgModule,
    SharedSortByModule,
    GuildsParamsRoutingModule
  ]
})
export class GuildsParamsModule { }
