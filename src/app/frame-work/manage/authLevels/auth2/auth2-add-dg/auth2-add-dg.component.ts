import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { AuthsManagerService } from 'services/auths-manager.service';
import { VerificationService } from 'services/verification.service';

@Component({
  selector: 'app-auth2-add-dg',
  templateUrl: './auth2-add-dg.component.html',
  styleUrls: ['./auth2-add-dg.component.scss']
})
export class Auth2AddDgComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<Auth2AddDgComponent>,
    private verificationService: VerificationService,
    private authsManagerService: AuthsManagerService
  ) {
    data = data.di;
    this.form = fb.group({
      title: ['', Validators.required],
      authLevel1Id: data.authLevel1Id,
      cssClass: [''],
      logicalOrder: [''],
      route: [''],
      inSidebar: [false]
    })
  }
  async save() {
    if (!this.verificationService.sectionVertification(this.form.value)) {
      return;
    }
    const res = await this.authsManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.AuthLevel2ADD, this.form.value);
    if (res) {
      this.authsManagerService.dictionaryWrapperService.cleanSingleDictionary('authLev2Dictionary');
      this.authsManagerService.utilsService.snackBarMessageSuccess(res.message);
      this.dialogRef.close(this.form.value);
    }
  }
  close() {
    this.dialogRef.close();
  }

}
