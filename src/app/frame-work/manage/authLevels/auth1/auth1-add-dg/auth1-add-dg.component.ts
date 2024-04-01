import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { AuthsManagerService } from 'services/auths-manager.service';
import { VerificationService } from 'services/verification.service';

@Component({
  selector: 'app-auth1-add-dg',
  templateUrl: './auth1-add-dg.component.html',
  styleUrls: ['./auth1-add-dg.component.scss']
})
export class Auth1AddDgComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<Auth1AddDgComponent>,
    private verificationService: VerificationService,
    private authsManagerService: AuthsManagerService
  ) {
    this.form = fb.group({
      id: [''],
      title: [''],
      cssClass: [''],
      inSidebar: false,
      logicalOrder: ['']
    })
  }
  async save() {
    if (!this.verificationService.sectionVertification(this.form.value)) {
      return;
    }
    const res = await this.authsManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.AuthLevel1ADD, this.form.value);
    if (res) {
      this.authsManagerService.dictionaryWrapperService.cleanSingleDictionary('authLev1Dictionary');
      this.authsManagerService.utilsService.snackBarMessageSuccess(res.message);
      this.dialogRef.close(this.form.value);
    }
  }
  close() {
    this.dialogRef.close();
  }
}
