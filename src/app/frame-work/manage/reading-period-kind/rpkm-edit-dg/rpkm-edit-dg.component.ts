import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rpkm-edit-dg',
  templateUrl: './rpkm-edit-dg.component.html',
  styleUrls: ['./rpkm-edit-dg.component.scss']
})
export class RpkmEditDgComponent {

  form: FormGroup;
  selected: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RpkmEditDgComponent>,
    fb: FormBuilder) {
    data = data.row;

    this.form = fb.group({
      id: data.id,
      title: data.title,
      moshtarakinId: data.moshtarakinId,
      clientOrder: data.clientOrder,
      isEnabled: data.isEnabled
    })
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
}
