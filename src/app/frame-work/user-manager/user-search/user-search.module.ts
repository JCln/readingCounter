import { NgModule } from '@angular/core';
import { UserAddManagerService } from 'services/user-add-manager.service';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SelectActionComponent } from './select-action/select-action.component';
import { SelectRolesComponent } from './select-roles/select-roles.component';
import { SelectZoneComponent } from './select-zone/select-zone.component';
import { UserSearchRoutingModule } from './user-search-routing.module';
import { UserSearchComponent } from './user-search.component';


@NgModule({
  declarations: [
    UserSearchComponent,
    SelectActionComponent,
    SelectRolesComponent,
    SelectZoneComponent
  ],
  imports: [
    SharedModule,
    SharedPrimeNgModule,
    UserSearchRoutingModule
  ],
  providers: [UserAddManagerService]
})
export class UserSearchModule { }
