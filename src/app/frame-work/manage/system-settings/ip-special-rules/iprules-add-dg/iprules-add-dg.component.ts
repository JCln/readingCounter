import { ManageServerService } from 'services/manage-server.service';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { UtilsService } from 'services/utils.service';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-iprules-add-dg',
  templateUrl: './iprules-add-dg.component.html',
  styleUrls: ['./iprules-add-dg.component.scss']
})
export class IprulesAddDgComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<IprulesAddDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,    
    private ManageServerService: ManageServerService
  ) {

    this.form = fb.group({
      ip: [],
      period: [],
      endpoint: [],
      periodTimespan: [],
      limit: [],
      quotaExceededResponse: [],
      monitorMode: false,
    })
  }
  async save() {
    // If validation need to insert here?
    if (this.form) {
      console.log(this.form.value);

      if (this.ManageServerService.validationAddIpRules(this.form.value)) {
        // const a = await this.ManageServerService.postBody(ENInterfaces, this.form.value) // to do edit interface
        // if (a) {
        //   this.dialogRef.close(this.form.value);
        // }

      }
      else {
        // TODO: request for add
      }
    }

  }
  close() {
    this.dialogRef.close();
  }

}