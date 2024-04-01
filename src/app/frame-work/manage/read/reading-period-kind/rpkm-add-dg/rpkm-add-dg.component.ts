import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ReadManagerService } from 'services/read-manager.service';
import { VerificationService } from 'services/verification.service';

@Component({
  selector: 'app-rpm-add-dg',
  templateUrl: './rpkm-add-dg.component.html',
  styleUrls: ['./rpkm-add-dg.component.scss']
})
export class RpkmAddDgComponent {
  selectedValue: string;
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<RpkmAddDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private verificationService: VerificationService,
    private readManagerService: ReadManagerService
  ) {
    this.form = fb.group({
      id: [''],
      title: [''],
      moshtarakinId: [''],
      clientOrder: [''],
      isEnabled: [false],
      days: [null]
    })
  }
  async save() {
    if (!this.verificationService.sectionVertification(this.form.value)) {
      return;
    }
    if (!await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.readingPeriodKindAdd, this.form.value))
      return;

    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}