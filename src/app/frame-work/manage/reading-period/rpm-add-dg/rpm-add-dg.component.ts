import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rpm-add-dg',
  templateUrl: './rpm-add-dg.component.html',
  styleUrls: ['./rpm-add-dg.component.scss']
})
export class RpmAddDgComponent {
  selectedValue: string;
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<RpmAddDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    data = data.di;
    this.form = fb.group({
      id: [''],
      title: [''],
      zoneId: data.zoneId,
      moshtarakinId: [''],
      readingPeriodKindId: [''],
      clientOrder: ['']
    })
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}