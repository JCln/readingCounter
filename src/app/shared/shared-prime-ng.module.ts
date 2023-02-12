import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { AddRowDirective } from './../directives/add-row.directive';
import { ImageViewerComponent } from './carousel-woum/woum/image-viewer/image-viewer.component';
import { PrimeTableEditableComponent } from './prime-table-editable/prime-table-editable.component';
import { PrimeTableComponent } from './prime-table/prime-table.component';

@NgModule({
  declarations: [AddRowDirective, PrimeTableComponent, PrimeTableEditableComponent, ImageViewerComponent],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    MatCheckboxModule,
    MultiSelectModule,
    CheckboxModule,
    DropdownModule,
    SliderModule,
    DynamicDialogModule,
    RadioButtonModule,
    SelectButtonModule,
    SharedThreeModule,
  ],
  exports: [
    PrimeTableComponent,
    PrimeTableEditableComponent,
    CommonModule,
    FormsModule,
    TableModule,
    MatCheckboxModule,
    MultiSelectModule,
    CheckboxModule,
    DropdownModule,
    SliderModule,
    DynamicDialogModule,
    AddRowDirective,
    ReactiveFormsModule,
    RadioButtonModule,
    SelectButtonModule,
    SharedThreeModule,
  ],
  entryComponents: [
    ImageViewerComponent,
  ],
  providers: []
})
export class SharedPrimeNgModule {
  static forRoot(): ModuleWithProviders<SharedPrimeNgModule> {
    // Forcing the whole app to use the returned providers from the AppModule only.
    return {
      ngModule: SharedPrimeNgModule,
      providers: [ /* All of your services here. It will hold the services needed by `itself`. */]
    };
  }
}
