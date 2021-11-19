import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ReadManagerService } from 'services/read-manager.service';
import { SectionsService } from 'services/sections.service';

@Component({
  selector: 'app-karbari-add-dg',
  templateUrl: './karbari-add-dg.component.html',
  styleUrls: ['./karbari-add-dg.component.scss']
})
export class KarbariAddDgComponent {
  selectedValue: string;
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<KarbariAddDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readManagerService: ReadManagerService,
    private sectionsService: SectionsService
  ) {
    data = data.di;
    this.form = fb.group({
      id: [''],
      moshtarakinId: ['', Validators.required],
      title: ['', Validators.required],
      provinceId: data.provinceId,
      isMaskooni: [false, Validators.required],
      isTejari: false,
      isSaxt: [false, Validators.required],
      hasReadingVibrate: [false, Validators.required]
    })

  }
  async save() {
    this.sectionsService.setSectionsValue(this.form.value);
    if (!this.sectionsService.sectionVertification()) {
      return;
    }
    if (!await this.readManagerService.addOrEditAuths(ENInterfaces.KarbariAdd, this.form.value))
      return;

    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}