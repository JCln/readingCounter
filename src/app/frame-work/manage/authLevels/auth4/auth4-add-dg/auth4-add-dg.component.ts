import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { AuthsManagerService } from 'services/auths-manager.service';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { SectionsService } from 'services/sections.service';

@Component({
  selector: 'app-auth4-add-dg',
  templateUrl: './auth4-add-dg.component.html',
  styleUrls: ['./auth4-add-dg.component.scss']
})
export class Auth4AddDgComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<Auth4AddDgComponent>,
    private sectionsService: SectionsService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private authsManagerService: AuthsManagerService
  ) {
    data = data.di;
    this.form = fb.group({
      title: ['', Validators.required],
      authLevel3Id: [data.authLevel3Id, Validators.required],
      value: ['', Validators.required],
      cssClass: [''],
      logicalOrder: ['', Validators.required],
      isSidebar: [false]
    })
  }
  async save() {
    this.sectionsService.setSectionsValue(this.form.value);
    if (!this.sectionsService.sectionVertification()) {
      return;
    }
    if (!await this.authsManagerService.addOrEditAuths(ENInterfaces.AuthLevel4ADD, this.form.value))
      return;

    this.dictionaryWrapperService.cleanSingleDictionary('authLev4Dictionary');
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
}
