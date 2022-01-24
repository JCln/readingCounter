import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENSnackBarColors, IDictionaryManager } from 'interfaces/ioverall-config';
import { IAutomaticImportAddEdit } from 'interfaces/ireads-manager';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FragmentManagerService } from 'services/fragment-manager.service';

@Component({
  selector: 'app-auto-import-dg',
  templateUrl: './auto-import-dg.component.html',
  styleUrls: ['./auto-import-dg.component.scss']
})
export class AutoImportDgComponent implements OnInit {
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  dataReq: IAutomaticImportAddEdit = {
    fragmentMasterId: '',
    readingPeriodKindId: null,
    startDay: '',
    endDay: '',
    startTime: '',
    alalHesabPercent: null,
    imagePercent: null,
    hasPreNumber: false,
    displayBillId: false,
    displayRadif: false,
  };

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private cdr: ChangeDetectorRef,
    private fragmentManagerService: FragmentManagerService,
  ) { }
  ngOnInit(): void {
    console.log(this.config.data);

    this.readingPeriodKindDictionary = this.config.data.dictionary;
    this.dataReq.fragmentMasterId = this.config.data.fragmentMasterId;
  }
  async save() {
    if (this.fragmentManagerService.verificationAutoImportAdd(this.dataReq)) {
      const temp = await this.fragmentManagerService.postBody(ENInterfaces.automaticImportAdd, this.dataReq);
      if (temp) {
        console.log(temp);

        this.fragmentManagerService.showSnack(temp.message, ENSnackBarColors.success);

        this.ref.close(this.dataReq);
      }
    }
  }
  close() {
    this.ref.close();
  }
  receiveStartDayJalali = (event: string) => {
    this.dataReq.startDay = event;
  }
  receiveEndDayJalali = (event: string) => {
    this.dataReq.endDay = event;
  }
  receiveStartTimeJalali = (event: string) => {
    this.dataReq.startTime = event;
  }

}
