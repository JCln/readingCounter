import { NgModule } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { ProRoutingModule } from './pro-routing.module';
import { ProComponent } from './pro.component';
import { SearchDgComponentComponent } from './search-dg-component/search-dg-component.component';


@NgModule({
  declarations: [ProComponent, SearchDgComponentComponent],
  imports: [
    SharedModule,
    SharedPrimeNgModule,
    SharedThreeModule,
    ProRoutingModule
  ],
  providers: [DialogService]
})
export class ProModule { }
