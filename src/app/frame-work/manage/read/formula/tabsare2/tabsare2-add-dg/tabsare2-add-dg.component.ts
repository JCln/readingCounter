import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { FormulasService } from 'services/formulas.service';
import { VerificationService } from 'services/verification.service';

@Component({
  selector: 'app-tabsare2-add-dg',
  templateUrl: './tabsare2-add-dg.component.html',
  styleUrls: ['./tabsare2-add-dg.component.scss']
})
export class Tabsare2AddDgComponent {
  selectedValue: string;
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<Tabsare2AddDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formulasService: FormulasService,
    private verificationService: VerificationService
  ) {

    this.form = fb.group({
      zoneId: [],
      formula: ['']
    })

  }

  async save() {
    if (!this.verificationService.sectionVertification(this.form.value)) {
      return;
    }
    if (!await this.formulasService.postFormulaAdd(ENInterfaces.FormulaTabsare2Add, this.form.value))
      return;

    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}
