import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EN_messages } from 'interfaces/enums.enum';
import { UtilsService } from 'services/utils.service';

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
    if (this.utilsService.isNullTextValidation(this.userInputText)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_desc);
      return;
    }
    if (!this.utilsService.isLowerThanMinLength(this.userInputText, 4)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid);
      return;
    }
    else {
      this.mdDialogRef.close(this.userInputText);
    }
  }
  public confirmWithoutText = () => {
    this.mdDialogRef.close(true);
  }
  public cancel() {
    this.mdDialogRef.close();
  }

}
