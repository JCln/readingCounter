import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

import { ConfirmDialogCheckboxComponent } from './confirm-dialog-checkbox/confirm-dialog-checkbox.component';


@NgModule({
    declarations: [
        ConfirmDialogCheckboxComponent
    ],
    imports: [
        MatCheckboxModule,
        MatDialogModule,
        CommonModule
    ],
    exports: [
        ConfirmDialogCheckboxComponent
    ]
})
export class SharedConfirmsModule {
    static forRoot(): ModuleWithProviders<SharedConfirmsModule> {
        // Forcing the whole app to use the returned providers from the AppModule only.
        return {
            ngModule: SharedConfirmsModule,
            providers: [ /* All of your services here. It will hold the services needed by `itself`. */]
        };
    }
}
