import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { FormulasService } from 'services/formulas.service';
import { SectionsService } from 'services/sections.service';

@Component({
  selector: 'app-tabsare3-add-dg',
  templateUrl: './tabsare3-add-dg.component.html',
  styleUrls: ['./tabsare3-add-dg.component.scss']
})
export class Tabsare3AddDgComponent {
  selectedValue: string;
  form: FormGroup;

  constructor(fb: FormBuilder,
    private dialogRef: MatDialogRef<Tabsare3AddDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formulasService: FormulasService,
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
      fazelabFormula: [''],
      formula: ['']
    })

  }
  receiveFromDateJalali = ($event: string) => {
    this.form.get('fromDate').setValue($event);
  }
  receiveToDateJalali = ($event: string) => {
    this.form.get('toDate').setValue($event);
  }

  async save() {
    this.sectionsService.setSectionsValue(this.form.value);
    if (!this.sectionsService.sectionVertification()) {
      return;
    }
    if (!await this.formulasService.postFormulaAdd(ENInterfaces.FormulaTabsare3Add, this.form.value))
      return;

    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }


}
