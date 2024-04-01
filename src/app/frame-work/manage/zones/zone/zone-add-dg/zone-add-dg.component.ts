import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { VerificationService } from 'services/verification.service';
import { SectorsManagerService } from 'services/sectors-manager.service';

@Component({
  selector: 'app-zone-add-dg',
  templateUrl: './zone-add-dg.component.html',
  styleUrls: ['./zone-add-dg.component.scss']
})
export class ZoneAddDgComponent {
  selectedValue: string;
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<ZoneAddDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private verificationService: VerificationService,
    private sectorsManagerService: SectorsManagerService
  ) {
    data = data.di;
    this.form = fb.group({
      id: [''],
      title: [''],
      regionId: data.regionId,
      isMetro: true,
      logicalOrder: ['']
    })
  }
  async save() {
    if (!this.verificationService.sectionVertification(this.form.value)) {
      return;
    }
    if (!await this.sectorsManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ZoneADD, this.form.value))
      return;

    this.sectorsManagerService.dictionaryWrapperService.cleanSingleDictionary('zoneDictionary');
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}