import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { IImportDynamicRes } from './../../Interfaces/inon-manage';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    private mdDialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IImportDynamicRes
  ) {
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

  ngOnInit(): void {
  }

}
