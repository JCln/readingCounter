import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
    imports: [
        MatCheckboxModule,
        MatDialogModule,
        MatSelectModule,
        MatStepperModule
    ],
    exports: [
        MatCheckboxModule,
        MatDialogModule,
        MatSelectModule,
        MatStepperModule
    ]
})
export class MaterialModule {
}