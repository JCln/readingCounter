import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-region-edit-dg',
  templateUrl: './region-edit-dg.component.html',
  styleUrls: ['./region-edit-dg.component.scss']
})
export class RegionEditDgComponent {
  form: FormGroup;

  constructor(fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RegionEditDgComponent>) {
    this.form = fb.group({
      id: data.id,
      title: data.title,
      provinceId: data.provinceId,
      logicalOrder: data.logicalOrder
    })
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
}
