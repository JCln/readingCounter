import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { AuthsManagerService } from 'services/auths-manager.service';
import { SectionsService } from 'services/sections.service';

@Component({
  selector: 'app-auth3-add-dg',
  templateUrl: './auth3-add-dg.component.html',
  styleUrls: ['./auth3-add-dg.component.scss']
})
export class Auth3AddDgComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<Auth3AddDgComponent>,
    private sectionsService: SectionsService,
    public authsManagerService: AuthsManagerService
  ) {
    data = data.di;
    this.form = fb.group({
      title: ['', Validators.required],
      authLevel2Id: data.authLevel2Id,
      cssClass: [''],
      route: [''],
      inSidebar: [false],
      isClosable: [false],
      isRefreshable: [false],
      logicalOrder: ['']
    })
  }
  async save() {
    this.form.value['route'] = this.form.value['route'].trim();
    this.sectionsService.setSectionsValue(this.form.value);
    if (!this.sectionsService.sectionVertification()) {
      return;
    }
    const res = await this.authsManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.AuthLevel3ADD, this.form.value);
    if (res) {
      this.authsManagerService.dictionaryWrapperService.cleanSingleDictionary('authLev3Dictionary');
      this.authsManagerService.utilsService.snackBarMessageSuccess(res.message);
      this.dialogRef.close(this.form.value);
    }
  }
  close() {
    this.dialogRef.close();
  }
}