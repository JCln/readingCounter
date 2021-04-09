import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cr-edit-dg',
  templateUrl: './cr-edit-dg.component.html',
  styleUrls: ['./cr-edit-dg.component.scss']
})
export class CrEditDgComponent {
  form: FormGroup;
  selected: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CrEditDgComponent>,
    fb: FormBuilder) {

    const editable = data.editable;
    data = data.row;
    this.selected = data.zoneId;

    this.form = fb.group({
      id: data.id,
      moshtarakinId: data.moshtarakinId,
      title: data.title,
      zoneId: editable,
      isAhad: data.isAhad,
      isKarbari: data.isKarbari,
      canNumberBeLessThanPre: data.canNumberBeLessThanPre,
      isTavizi: data.isTavizi,
      clientOrder: data.clientOrder
    })
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
}