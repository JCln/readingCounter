import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AddNewComponent } from '../frame-work/role-manager/add-new/add-new.component';
import { DeleteDialogComponent } from '../frame-work/role-manager/delete-dialog/delete-dialog.component';
import { MatCheckboxComponent } from './mat-checkbox/mat-checkbox.component';
import { MaterialModule } from './material.module';
import { SharedRoutingModule } from './shared-routing.module';
import { ToggleComponent } from './toggle/toggle.component';


@NgModule({
  declarations: [MatCheckboxComponent, ToggleComponent, AddNewComponent, DeleteDialogComponent],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    SharedRoutingModule
  ],
  exports: [
    CommonModule, FormsModule, MaterialModule, ToggleComponent, AddNewComponent, DeleteDialogComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    // Forcing the whole app to use the returned providers from the AppModule only.
    return {
      ngModule: SharedModule,
      providers: [ /* All of your services here. It will hold the services needed by `itself`. */]
    };
  }
}
