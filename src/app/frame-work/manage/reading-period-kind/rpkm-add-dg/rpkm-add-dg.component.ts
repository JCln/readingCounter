import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rpm-add-dg',
  templateUrl: './rpkm-add-dg.component.html',
  styleUrls: ['./rpkm-add-dg.component.scss']
})
export class RpkmAddDgComponent {
  selectedValue: string;
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<RpkmAddDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    data = data.di;
    this.form = fb.group({
      id: [''],
      title: [''],
      moshtarakinId: [''],
      clientOrder: [''],
      isEnabled: ['']
    })
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}