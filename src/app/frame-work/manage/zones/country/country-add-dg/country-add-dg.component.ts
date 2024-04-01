import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { VerificationService } from 'services/verification.service';
import { SectorsManagerService } from 'services/sectors-manager.service';

@Component({
  selector: 'app-country-add-dg',
  templateUrl: './country-add-dg.component.html',
  styleUrls: ['./country-add-dg.component.scss']
})
export class CountryAddDgComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<CountryAddDgComponent>,
    private verificationService: VerificationService,
    private sectorsManagerService: SectorsManagerService
  ) {
    this.form = fb.group({
      id: [''],
      title: '',
    })
  }
  async save() {
    if (!this.verificationService.sectionVertification(this.form.value)) {
      return;
    }
    if (!await this.sectorsManagerService.postObjectBySuccessMessage(ENInterfaces.CountryADD, this.form.value))
      return;

    this.sectorsManagerService.dictionaryWrapperService.cleanSingleDictionary('countryDictionary');
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}