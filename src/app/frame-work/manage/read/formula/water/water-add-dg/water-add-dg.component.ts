import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { SectionsService } from 'src/app/services/sections.service';

@Component({
  selector: 'app-water-add-dg',
  templateUrl: './water-add-dg.component.html',
  styleUrls: ['./water-add-dg.component.scss']
})
export class WaterAddDgComponent {
  selectedValue: string;
  form: FormGroup;
  karbariCodeDic: IDictionaryManager[] = [];

  constructor(fb: FormBuilder,
    private dialogRef: MatDialogRef<WaterAddDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sectionsService: SectionsService
  ) {

    this.form = fb.group({
      zoneId: [],
      karbariMoshtarakinCode: [],
      fromDate: [''],
      toDate: [''],
      fromRate: [0],
      toRate: [0],
      abFormula: [''],
      fazelabFormula: ['']
    })

  }
  receiveFromDateJalali = ($event: string) => {
    this.form.get('fromDate').setValue($event);
  }
  receiveToDateJalali = ($event: string) => {
    this.form.get('toDate').setValue($event);
  }

  save() {
    this.sectionsService.setSectionsValue(this.form.value);
    if (!this.sectionsService.sectionVertification()) {
      return;
    }
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}