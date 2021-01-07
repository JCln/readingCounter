import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

@Injectable({
  providedIn: 'root'
})
export class TrackingManagerService {
  columnSelectedMenuDefault = () => {
    return [
      { field: 'trackNumber', header: 'شماره پیگیری', isSelected: true },
      { field: 'listNumber', header: 'شماره لیست', isSelected: true },
      { field: 'insertDateJalali', header: 'تاریخ', isSelected: true },
      { field: 'zoneId', header: 'ناحیه', isSelected: false },
      { field: 'zoneTitle', header: 'عنوان ناحیه', isSelected: true },
      { field: 'isBazdid', header: 'بازدید', isSelected: false },
      { field: 'year', header: 'سال', isSelected: false },
      { field: 'isRoosta', header: 'روستایی', isSelected: false },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: true },
      { field: 'fromDate', header: 'از تاریخ', isSelected: false },
      { field: 'toDate', header: 'تا تاریخ', isSelected: false },
      { field: 'itemQuantity', header: 'تعداد', isSelected: true },
      { field: 'alalHesabPercent', header: 'درصد علی الحساب', isSelected: false },
      { field: 'imagePercent', header: 'درصد تصویر', isSelected: false },
      { field: 'hasPreNumber', header: 'پیش شماره', isSelected: false },
      { field: 'displayBillId', header: 'شناسه قبض', isSelected: false },
      { field: 'displayRadif', header: 'ردیف', isSelected: false }
    ];
  }

  constructor(
    private interfaceManagerService: InterfaceManagerService
  ) { }

  getImportedDataSource = (): Observable<any> => {
    return this.interfaceManagerService.getTrackImported();
  }
  getLoadedDataSource = (): Observable<any> => {
    return this.interfaceManagerService.getTrackLoaded();
  }
  getReadingDataSource = (): Observable<any> => {
    return this.interfaceManagerService.getTrackReading();
  }
  getOffloadedDataSource = (): Observable<any> => {
    return this.interfaceManagerService.getTrackOffloaded();
  }
  getFinishedDataSource = (): Observable<any> => {
    return this.interfaceManagerService.getTrackFinished();
  }



}
