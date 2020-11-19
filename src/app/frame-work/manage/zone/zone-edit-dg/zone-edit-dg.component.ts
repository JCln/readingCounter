import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-zone-edit-dg',
  templateUrl: './zone-edit-dg.component.html',
  styleUrls: ['./zone-edit-dg.component.scss']
})
export class ZoneEditDgComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ZoneEditDgComponent>,
    fb: FormBuilder) {
    this.form = fb.group({
      id: data.id,
      title: data.title,
      regionId: data.regionId,
      isMetro: data.isMetro,
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
