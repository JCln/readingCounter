import { ManageServerService } from 'services/manage-server.service';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EN_messages } from 'interfaces/enums.enum';
import { UtilsService } from 'services/utils.service';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-iprules-edit-dg',
  templateUrl: './iprules-edit-dg.component.html',
  styleUrls: ['./iprules-edit-dg.component.scss']
})
export class IprulesEditDgComponent {
  form: FormGroup;
  selected: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<IprulesEditDgComponent>,
    fb: FormBuilder,
    private manageServerService: ManageServerService
  ) {
    data = data.row;

    this.form = fb.group({
      endpoint: data.endpoint,
      period: data.period,
      periodTimespan: data.periodTimespan,
      limit: data.limit,
      quotaExceededResponse: data.quotaExceededResponse,
      ip: data.ip,
      monitorMode: data.monitorMode,
    })
  }
  save() {
    if (this.manageServerService.validationAddIpRules(this.form.value)) {
      this.dialogRef.close(this.form.value);
    }
  }
  close() {
    this.dialogRef.close();
  }
}