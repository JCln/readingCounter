import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDictionaryManager } from 'interfaces/ioverall-config';

@Component({
  selector: 'app-auto-import-dg',
  templateUrl: './auto-import-dg.component.html',
  styleUrls: ['./auto-import-dg.component.scss']
})
export class AutoImportDgComponent {
  form: FormGroup;
  readingPeriodKindDictionary: IDictionaryManager[] = [];

  constructor(
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AutoImportDgComponent>
  ) {
    this.readingPeriodKindDictionary = data.dictionary;

    this.form = fb.group({
      fragmentMasterId: data.fragmentMasterId,
      readingPeriodKindId: ['', Validators.required],
      startDay: ['', Validators.required],
      endDay: ['', , Validators.required],
      startTime: ['', Validators.required],
    })
  }
  async save() {
    console.log(this.form.value);

    // this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
  receiveFromDateJalali = ($event: string) => {
    this.form.value.startDay = $event;
  }
  receiveToDateJalali = ($event: string) => {
    this.form.value.endDay = $event;
  }
  receiveStartTimeJalali = ($event: string) => {
    this.form.value.startTime = $event;
  }

}
