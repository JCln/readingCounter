import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { AuthsManagerService } from 'services/auths-manager.service';
import { VerificationService } from 'services/verification.service';

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
    private verificationService: VerificationService,
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
    this.form.value['value'] = this.form.value['value'].trim();
    
    if (this.verificationService.sectionVertification(this.form.value)) {
      const res = await this.authsManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.AuthLevel4ADD, this.form.value);
      if (res) {
        this.authsManagerService.dictionaryWrapperService.cleanSingleDictionary('authLev4Dictionary');
        this.authsManagerService.utilsService.snackBarMessageSuccess(res.message);
        this.dialogRef.close(this.form.value);
      }
    }
  }
  close() {
    this.dialogRef.close();
  }
}
