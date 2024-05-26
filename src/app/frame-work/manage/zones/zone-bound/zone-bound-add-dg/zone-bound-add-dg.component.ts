import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { VerificationService } from 'services/verification.service';
import { SectorsManagerService } from 'services/sectors-manager.service';

@Component({
  selector: 'app-zone-bound-add-dg',
  templateUrl: './zone-bound-add-dg.component.html',
  styleUrls: ['./zone-bound-add-dg.component.scss']
})
export class ZoneBoundAddDgComponent {
  selectedValue: string;
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ZoneBoundAddDgComponent>,
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private verificationService: VerificationService,
    private sectorsManagerService: SectorsManagerService
  ) {
    data = data.di
    this.form = fb.group({
      title: '',
      zoneId: data.zoneId,
      govermentalCode: null,
      fromEshterak: '',
      toEshterak: '',
      fromRadif: [''],
      toRadif: [''],
      host: '',
      dbUserName: '',
      dbPassword: '',
      dbInitialCatalog: ''
    })
  }
  async save() {
    if (!this.verificationService.sectionVertification(this.form.value)) {
      return;
    }
    if (!await this.sectorsManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ZoneBoundADD, this.form.value))
      return;

    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}