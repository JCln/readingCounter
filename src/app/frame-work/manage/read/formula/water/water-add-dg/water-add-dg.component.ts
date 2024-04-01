import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { FormulasService } from 'services/formulas.service';
import { VerificationService } from 'services/verification.service';

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
    private formulasService: FormulasService,
    private verificationService: VerificationService
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

  async save() {
    if (!this.verificationService.sectionVertification(this.form.value)) {
      return;
    }
    if (!await this.formulasService.postFormulaAdd(ENInterfaces.FormulaWaterAdd, this.form.value))
      return;

    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}