import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeModule } from 'primeng/tree';
import { ImageViewerComponent } from './carousel-woum/woum/image-viewer/image-viewer.component';
import { PrimeTableEditableComponent } from './prime-table-editable/prime-table-editable.component';
import { PrimeTableComponent } from './prime-table/prime-table.component';
import { AddRowDirective } from '../directives/add-row.directive';
import { ConfirmTextDialogComponent } from './confirm-text-dialog/confirm-text-dialog.component';
import { AccordionModule } from 'primeng/accordion';
import { SharedChangePassModule } from './shared-change-pass.module';
import { UserBlockingComponent } from './user-blocking/user-blocking.component';
import { MaterialModule } from './material.module';
import { TabViewModule } from 'primeng/tabview';
import { InputMaskModule } from 'primeng/inputmask';
import { SharedCarouselModule } from './shared_carousel';
import { UnSortTableDirective } from '../directives/un-sort-table.directive';
import { PrimeConfirmDgComponent } from './prime-confirm-dg/prime-confirm-dg.component';


@NgModule({
  declarations: [
    AddRowDirective,
    UnSortTableDirective,
    PrimeTableComponent,
    PrimeTableEditableComponent,
    ImageViewerComponent,
    ConfirmTextDialogComponent,
    UserBlockingComponent,
    PrimeConfirmDgComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    MatCheckboxModule,
    MultiSelectModule,
    CheckboxModule,
    TreeSelectModule,
    TreeModule,
    DropdownModule,
    InputMaskModule,
    AccordionModule,
    SliderModule,
    DynamicDialogModule,
    RadioButtonModule,
    TabViewModule,
    SelectButtonModule,
    SharedThreeModule,
    SharedChangePassModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedCarouselModule,
    // mat-dialog-module for confirmTextDialog component added
    MatDialogModule,
  ],
  exports: [
    PrimeTableComponent,
    PrimeTableEditableComponent,
    PrimeConfirmDgComponent,
    UserBlockingComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    TabViewModule,
    MatCheckboxModule,
    MultiSelectModule,
    CheckboxModule,
    TreeSelectModule,
    TreeModule,
    DropdownModule,
    InputMaskModule,
    AccordionModule,
    SliderModule,
    DynamicDialogModule,
    AddRowDirective,
    UnSortTableDirective,
    SharedCarouselModule,
    RadioButtonModule,
    SelectButtonModule,
    SharedThreeModule
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
