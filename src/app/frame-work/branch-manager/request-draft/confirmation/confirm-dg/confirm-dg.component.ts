import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BranchesService } from 'services/branches.service';

@Component({
  selector: 'app-confirm-dg',
  templateUrl: './confirm-dg.component.html',
  styleUrls: ['./confirm-dg.component.scss']
})
export class ConfirmDgComponent {
  _selectCols: any[] = [];

  constructor(
    private mdDialogRef: MatDialogRef<ConfirmDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public branchesService: BranchesService,
  ) {
    console.log(data.data);
    this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.branchesService.columnManager.getColumnsMenus(this.data.outputFileName);
    console.log(this._selectCols);
  }
  public close(value) {
    this.mdDialogRef.close(value);
  }
  public cancel() {
    this.close(false);
  }
  public confirm() {
    this.close(true);
  }
}
