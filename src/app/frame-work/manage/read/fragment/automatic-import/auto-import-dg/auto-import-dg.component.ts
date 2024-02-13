import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENSnackBarColors } from 'interfaces/enums.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
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
  userCounterReaderDictionary: IDictionaryManager[] = [];

  dataReq: IAutomaticImportAddEdit = {
    fragmentMasterId: '',
    readingPeriodKindId: null,
    startDay: '',
    endDay: '',
    startTime: '',
    counterReaderId: null,
    alalHesabPercent: null,
    imagePercent: null,
    hasPreNumber: false,
    displayBillId: false,
    displayRadif: false,
    displayPreDate: false,
    displayMobile: false,
    hasImage: false,
    displayDebt: false,
    displayIcons: false,
  };

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private cdr: ChangeDetectorRef,
    public fragmentManagerService: FragmentManagerService,
  ) { }
  ngOnInit(): void {
    this.readingPeriodKindDictionary = this.config.data.dictionary;
    this.dataReq.fragmentMasterId = this.config.data.fragmentMasterId;
    this.userCounterReaderDictionary = JSON.parse(JSON.stringify(this.config.data.counterReaders));

    if (this.userCounterReaderDictionary[0].id !== 0)
      this.userCounterReaderDictionary.unshift({ id: 0, title: 'تنظیم اتوماتیک', isSelected: true })
    this.cdr.detectChanges();
  }
  async save() {
    if (this.fragmentManagerService.verificationAutoImportAdd(this.dataReq)) {
      const temp = await this.fragmentManagerService.postBody(ENInterfaces.automaticImportAdd, this.dataReq);
      if (temp) {
        this.fragmentManagerService.showSnack(temp.message, ENSnackBarColors.success);
        this.ref.close(this.dataReq);
      }
    }
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
