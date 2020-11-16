import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { KarbariRoutingModule } from './karbari-routing.module';
import { KarbariComponent } from './karbari.component';
import { KarbariAddDgComponent } from './karbari-add-dg/karbari-add-dg.component';


@NgModule({
  declarations: [KarbariComponent, KarbariAddDgComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    KarbariRoutingModule
  ]
})
export class KarbariModule { }
