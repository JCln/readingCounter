import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ReadManagerService } from 'services/read-manager.service';
import { VerificationService } from 'services/verification.service';

@Component({
  selector: 'app-rpm-add-dg',
  templateUrl: './rpm-add-dg.component.html',
  styleUrls: ['./rpm-add-dg.component.scss']
})
export class RpmAddDgComponent {
  selectedValue: string;
  readingPeriodKindId: any;
  form: FormGroup;
  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<RpmAddDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private verificationService: VerificationService,
    private readManagerService: ReadManagerService
  ) {
    this.readingPeriodKindId = data.rpkmId;
    data = data.di;
    this.form = fb.group({
      id: [''],
      title: [''],
      zoneId: data.zoneId,
      moshtarakinId: [''],
      readingPeriodKindId: [0],
      clientOrder: ['']
    })
  }
  async save() {
    if (!this.verificationService.sectionVertification(this.form.value)) {
      return;
    }
    if (!await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.readingPeriodAdd, this.form.value))
      return;

    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}