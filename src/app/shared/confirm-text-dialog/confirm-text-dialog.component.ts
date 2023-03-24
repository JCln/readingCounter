import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EN_messages } from 'interfaces/enums.enum';
import { UtilsService } from 'services/utils.service';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-confirm-text-dialog',
  templateUrl: './confirm-text-dialog.component.html',
  styleUrls: ['./confirm-text-dialog.component.scss']
})
export class ConfirmTextDialogComponent {
  userInputText: string = '';
  _selectedDate: string = '';

  constructor(
    private mdDialogRef: MatDialogRef<ConfirmTextDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utilsService: UtilsService
  ) { }

  public confirm() {
    if (MathS.isNullTextValidation(this.userInputText)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_desc);
      return;
    }
    if (!MathS.isLowerThanMinLength(this.userInputText, 6)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalidCounts);
      return;
    }
    else {
      this.mdDialogRef.close(this.userInputText);
    }
  }
  public confirmWithoutText = () => {
    if (this.data.isSelectableDate) {
      if (MathS.isNull(this._selectedDate)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_date);
        return;
      }
      this.mdDialogRef.close(this._selectedDate);
      return;
    }
    this.mdDialogRef.close(true);
  }
  public cancel() {
    this.mdDialogRef.close();
  }
  receiveFromDateJalali = ($event: string) => {
    this._selectedDate = $event;
  }

}
