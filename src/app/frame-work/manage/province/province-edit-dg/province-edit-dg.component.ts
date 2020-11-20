import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-province-edit-dg',
  templateUrl: './province-edit-dg.component.html',
  styleUrls: ['./province-edit-dg.component.scss']
})
export class ProvinceEditDgComponent {
  form: FormGroup;

  constructor(fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProvinceEditDgComponent>
  ) {
    data = data.row;
    this.form = fb.group({
      id: data.id,
      title: data.title,
      countryId: data.countryId,
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
