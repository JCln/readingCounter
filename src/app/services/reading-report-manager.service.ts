import { Injectable } from '@angular/core';
import { IDictionaryManager, IObjectIteratation } from 'src/app/Interfaces/ioverall-config';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { UtilsService } from 'src/app/services/utils.service';

import { IReadingReportDetails, IReadingReportMaster, IReadingReportReq } from './../Interfaces/imanage';

@Injectable({
  providedIn: 'root'
})
export class ReadingReportManagerService {
  private readingReportReq: IReadingReportReq;

  columnSelectedReadingReport = (): IObjectIteratation[] => {
    return [
      { field: 'zoneId', header: 'ش پیگیری', isSelected: true, readonly: true },
      { field: 'zoneTitle', header: 'ش لیست', isSelected: true, readonly: true },
      { field: 'reportId', header: 'تاریخ', isSelected: true, readonly: true },
      { field: 'reportTitle', header: 'ناحیه', isSelected: true, readonly: true },
      { field: 'itemCount', header: 'ناحیه', isSelected: true, readonly: true }
    ];
  }

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService
  ) { }

  // call APIs
  postRRMasterManager = (): Promise<IReadingReportMaster> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postRRMasterManager(this.readingReportReq).subscribe((res: IReadingReportMaster) => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }

  }
  postRRDetailsManager = (body: IReadingReportReq): Promise<IReadingReportDetails> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postRRDetailsManager(body).subscribe((res: IReadingReportDetails) => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  getReadingPeriodDictionary = (kindId: string): Promise<IDictionaryManager> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.getReadingPeriodByKindManagerDictionary(kindId).subscribe((res: IDictionaryManager) => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  getReadingPeriodKindDictionary = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.getReadingPeriodKindManagerDictionary().subscribe((res: any) => {
          resolve(res);
        })
      });
    } catch {
      console.error(e => e);
    }
  }
  //
  nullThePeriodities = () => {
    this.readingReportReq.readingPeriodId = '';
    this.readingReportReq.year = 0;
  }
  nullTheDates = () => {
    this.readingReportReq.fromDate = '';
    this.readingReportReq.toDate = '';
  }
  datesValidation = (): boolean => {
    if (this.utilsService.isNull(this.readingReportReq.fromDate)) {
      this.utilsService.snackBarMessageWarn('از تاریخ خالی است');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.toDate)) {
      this.utilsService.snackBarMessageWarn('تا تاریخ خالی است');
      return false;
    }
    this.nullThePeriodities();
    return true;
  }
  periodValidation = (): boolean => {
    if (this.utilsService.isNull(this.readingReportReq.year)) {
      this.utilsService.snackBarMessageWarn('سالی وارد نمایید');
      return false;
    }
    this.nullTheDates();
    return true;
  }
  verification = (readingReportReq: IReadingReportReq): boolean | IReadingReportReq => {
    this.readingReportReq = readingReportReq;
    if (this.utilsService.isNull(readingReportReq.readingPeriodId)) {
      return this.datesValidation();
    }
    if (!this.periodValidation())
      return false;
    return this.readingReportReq;
  }
}
