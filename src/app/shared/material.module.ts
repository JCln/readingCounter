import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    imports: [
        MatGridListModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatFormFieldModule,
        CdkTableModule,
        MatInputModule,
        MatCheckboxModule,
        MatRadioModule,
        MatButtonToggleModule,
        MatDialogModule,
        MatSelectModule,
        MatSnackBarModule
    ],
    exports: [
        MatGridListModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatFormFieldModule,
        CdkTableModule,
        MatInputModule,
        MatCheckboxModule,
        MatRadioModule,
        MatButtonToggleModule,
        MatDialogModule,
        MatSelectModule,
        MatSnackBarModule
    ]
})
export class MaterialModule {
}