import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { VerificationService } from 'services/verification.service';
import { SectorsManagerService } from 'services/sectors-manager.service';

@Component({
  selector: 'app-province-add-dg',
  templateUrl: './province-add-dg.component.html',
  styleUrls: ['./province-add-dg.component.scss']
})
export class ProvinceAddDgComponent {
  selectedValue: string;
  form: FormGroup;

  constructor(fb: FormBuilder,
    private dialogRef: MatDialogRef<ProvinceAddDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private verificationService: VerificationService,
    private sectorsManagerService: SectorsManagerService
  ) {
    data = data.di;
    this.form = fb.group({
      id: [''],
      title: '',
      countryId: data.countryId,
      logicalOrder: ['']
    })
  }
  async save() {
    if (!this.verificationService.sectionVertification(this.form.value)) {
      return;
    }
    if (!await this.sectorsManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ProvinceADD, this.form.value))
      return;

    this.sectorsManagerService.dictionaryWrapperService.cleanSingleDictionary('provinceDictionary');
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}