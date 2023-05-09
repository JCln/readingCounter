import { NgModule } from '@angular/core';

import { IpSpecialRulesRoutingModule } from './ip-special-rules-routing.module';
import { IpSpecialRulesComponent } from './ip-special-rules.component';
import { IprulesAddDgComponent } from './iprules-add-dg/iprules-add-dg.component';
import { IprulesEditDgComponent } from './iprules-edit-dg/iprules-edit-dg.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    IpSpecialRulesComponent,
    IprulesAddDgComponent,
    IprulesEditDgComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    IpSpecialRulesRoutingModule
  ]
})
export class IpSpecialRulesModule { }
