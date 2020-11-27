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
  selected: any;

  constructor(fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RegionEditDgComponent>) {
    const editable = data.editable
    data = data.row;
    this.selected = data.provinceId;
    this.form = fb.group({
      id: data.id,
      title: data.title,
      provinceId: editable,
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
