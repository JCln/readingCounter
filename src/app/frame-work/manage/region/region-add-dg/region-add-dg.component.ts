import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-region-add-dg',
  templateUrl: './region-add-dg.component.html',
  styleUrls: ['./region-add-dg.component.scss']
})
export class RegionAddDgComponent {
  form: FormGroup;

  constructor(fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RegionAddDgComponent>) {
    data = data.di;
    this.form = fb.group({
      id: 0,
      title: '',
      provinceId: data.provinceId,
      logicalOrder: 0
    })
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}