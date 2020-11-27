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
  selected: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ZoneEditDgComponent>,
    fb: FormBuilder) {
    const editable = data.editable;
    data = data.row;
    this.selected = data.regionId;

    this.form = fb.group({
      id: data.id,
      title: data.title,
      regionId: editable,
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
