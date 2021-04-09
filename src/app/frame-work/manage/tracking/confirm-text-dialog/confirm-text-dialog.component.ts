import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-confirm-text-dialog',
  templateUrl: './confirm-text-dialog.component.html',
  styleUrls: ['./confirm-text-dialog.component.scss']
})
export class ConfirmTextDialogComponent {
  userInputText: string = '';

  constructor(
    private mdDialogRef: MatDialogRef<ConfirmTextDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utilsService: UtilsService
  ) {
  }

  public confirm() {
    if (this.utilsService.isNullTextValidation(this.userInputText))
      this.utilsService.snackBarMessageWarn('توضیحی وارد نمایید');
    else {
      this.mdDialogRef.close(this.userInputText);
    }
  }
  public cancel() {
    this.mdDialogRef.close();
  }

}
