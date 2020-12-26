import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rpm-edit-dg',
  templateUrl: './rpm-edit-dg.component.html',
  styleUrls: ['./rpm-edit-dg.component.scss']
})
export class RpmEditDgComponent {
  form: FormGroup;
  selected: any;
  readingPeriodKindId: any;
  selectedRPKId: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RpmEditDgComponent>,
    fb: FormBuilder) {

    const editable = data.editable;
    data = data.row;
    this.selected = data.zoneId;
    this.selectedRPKId = data.readingPeriodKindId;

    this.form = fb.group({
      id: data.id,
      title: data.title,
      zoneId: editable,
      moshtarakinId: data.moshtarakinId,
      readingPeriodKindId: data.readingPeriodKindId,
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
