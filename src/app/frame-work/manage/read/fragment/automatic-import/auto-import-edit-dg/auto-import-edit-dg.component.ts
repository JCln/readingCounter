import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENSnackBarColors } from 'interfaces/enums.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { FragmentManagerService } from 'services/fragment-manager.service';

@Component({
  selector: 'app-auto-import-edit-dg',
  templateUrl: './auto-import-edit-dg.component.html',
  styleUrls: ['./auto-import-edit-dg.component.scss']
})
export class AutoImportEditDgComponent {
  form: FormGroup;
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  selectedPeriodKindId: number;

  constructor(
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AutoImportEditDgComponent>,
    public fragmentManagerService: FragmentManagerService,
  ) {
    console.log(data);
    this.readingPeriodKindDictionary = data.dictionary;
    console.log(data.body.readingPeriodId);

    this.selectedPeriodKindId = data.body.readingPeriodId;

    this.form = fb.group({
      id: data.body.id,
      fragmentMasterId: data.body.fragmentMasterId,
      readingPeriodKindId: data.body.readingPeriodId,
      startDay: data.body.createDayJalali,
      endDay: data.body.dueJalaliDay,
      startTime: data.body.createTime,
      alalHesabPercent: data.body.alalHesabPercent,
      imagePercent: data.body.imagePercent,
      hasPreNumber: data.body.hasPreNumber,
      displayBillId: data.body.displayBillId,
      displayRadif: data.body.displayRadif
    })
  }
  async save() {
    console.log(this.form.value);
    if (this.fragmentManagerService.verificationAutoImportAdd(this.form.value)) {
      const temp = await this.fragmentManagerService.postBody(ENInterfaces.automaticImportEdit, this.form.value);
      if (temp) {
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