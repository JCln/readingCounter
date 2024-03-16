import { NgModule } from '@angular/core';

import { ErrorsBackupRoutingModule } from './errors-backup-routing.module';
import { ErrorsBackupComponent } from './errors-backup.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    ErrorsBackupComponent
  ],
  imports: [
    SharedPrimeNgModule,
    ErrorsBackupRoutingModule
  ]
})
export class ErrorsBackupModule { }
