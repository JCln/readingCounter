import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
    imports: [
        MatInputModule,
        MatCheckboxModule,
        MatRadioModule,
        MatDialogModule,
        MatSelectModule,
        MatStepperModule
    ],
    exports: [
        MatInputModule,
        MatCheckboxModule,
        MatRadioModule,
        MatDialogModule,
        MatSelectModule,
        MatStepperModule
    ]
})
export class MaterialModule {
}