import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';

@Component({
  selector: 'app-confirm-dialog-exelview',
  templateUrl: './confirm-dialog-checkbox.component.html',
  styleUrls: ['./confirm-dialog-checkbox.component.scss']
})
export class ConfirmDialogExcelViewComponent {
  zoneDictionary: IDictionaryManager[] = [];
  karbariByCodeDictionary: IDictionaryManager[] = [];

  form: FormGroup;
  _content: object = {};

  constructor(
    private mdDialogRef: MatDialogRef<ConfirmDialogExcelViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public readingReportManagerService: ReadingReportManagerService
  ) {
    this.disjunkElements();
  }
  receiveFromDateJalali = ($event: string) => {
    this._content['fromDate'] = $event;
  }
  receiveToDateJalali = ($event: string) => {
    this._content['toDate'] = $event;
  }
  receivejalaliDateJalali = ($event: string) => {
    this._content['jalaliDate'] = $event;
  }
  // check
  public confirm() {
    this.mdDialogRef.close(this._content);
  }
  public cancel() {
    this._content = {};
    this.mdDialogRef.close(false);
  }
  private disjunkElements = async () => {
    if (this.data.data.includes('zoneId')) {
      this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
    }
    if (this.data.data.includes('karbari')) {
      this.karbariByCodeDictionary = await this.readingReportManagerService.dictionaryWrapperService.getkarbariCodeDictionary();
    }
  }

}
