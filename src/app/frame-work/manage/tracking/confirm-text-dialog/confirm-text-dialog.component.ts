import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EN_messages } from 'src/app/Interfaces/enums.enum';
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
    if (this.utilsService.isNullTextValidation(this.userInputText)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_desc);
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
