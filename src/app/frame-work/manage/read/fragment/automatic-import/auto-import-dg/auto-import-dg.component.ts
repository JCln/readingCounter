import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENSnackBarColors, IDictionaryManager } from 'interfaces/ioverall-config';
import { FragmentManagerService } from 'services/fragment-manager.service';

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
    private dialogRef: MatDialogRef<AutoImportDgComponent>,
    private fragmentManagerService: FragmentManagerService,
  ) {
    console.log(data);
    console.log(data.fragmentMasterId);

    this.readingPeriodKindDictionary = data.dictionary;

    this.form = fb.group({
      fragmentMasterId: data.fragmentMasterId,
      readingPeriodKindId: [''],
      startDay: [''],
      endDay: ['',],
      startTime: [''],
    })
  }
  async save() {
    console.log(this.form.value);
    if (this.fragmentManagerService.verificationAutoImportAdd(this.form.value)) {
      const temp = await this.fragmentManagerService.postBody(ENInterfaces.automaticImportAdd, this.form.value);
      if (temp) {
        console.log(temp);

        this.fragmentManagerService.showSnack(temp.message, ENSnackBarColors.success);

        this.dialogRef.close(this.form.value);
      }
    }
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
