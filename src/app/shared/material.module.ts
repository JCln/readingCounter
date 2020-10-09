import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
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
        MatRadioModule
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
        MatRadioModule
    ]
})
export class MaterialModule {
}