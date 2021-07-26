import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IObjectIteratation, IResponses } from 'interfaces/ioverall-config';
import { UtilsService } from 'services/utils.service';

import { ConfirmTextDialogComponent } from '../frame-work/manage/tracking/confirm-text-dialog/confirm-text-dialog.component';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { InterfaceManagerService } from './interface-manager.service';
import { SectionsService } from './sections.service';

@Injectable({
  providedIn: 'root'
})
export class SectorsManagerService {

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private utilsService: UtilsService,
    private dialog: MatDialog,
    private sectionsService: SectionsService
  ) { }
  /*COLUMNS */
  columnCountry = (): IObjectIteratation[] => {
    return [
      { field: 'title', header: 'عنوان', isSelected: true }
    ]
  }
  columnProvince = (): IObjectIteratation[] => {
    return [
      { field: 'title', header: 'عنوان', isSelected: true },
      { field: 'countryId', header: 'کشور', isSelected: true, isSelectOption: true },
      { field: 'logicalOrder', header: 'ترتیب', isSelected: true },
    ]
  }
  columnRegion = (): IObjectIteratation[] => {
    return [
      { field: 'title', header: 'عنوان', isSelected: true },
      { field: 'provinceId', header: 'استان', isSelected: true, isSelectOption: true },
      { field: 'logicalOrder', header: 'ترتیب', isSelected: true }
    ]
  }
  columnZone = (): IObjectIteratation[] => {
    return [
      { field: 'title', header: 'عنوان', isSelected: true },
      { field: 'regionId', header: 'منطقه', isSelected: true, isSelectOption: true },
      { field: 'isMetro', header: 'شهری', isSelected: true, isBoolean: true },
      { field: 'logicalOrder', header: 'ترتیب', isSelected: true }
    ]
  }
  columnZoneBound = (): IObjectIteratation[] => {
    return [
      { field: 'title', header: 'عنوان', isSelected: true },
      { field: 'zoneId', header: 'ناحیه', isSelected: true, isSelectOption: true },
      // { field: 'govermentalCode', header: 'کشور', isSelected: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: true, ltr: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: true, ltr: true },
      // { field: 'fromRadif', header: 'عنوان', isSelected: true },
      // { field: 'toRadif', header: 'کشور', isSelected: true },
      // { field: 'host', header: 'ترتیب', isSelected: true },
      // { field: 'dbUserName', header: 'ترتیب', isSelected: true },
      // { field: 'dbPassword', header: 'ترتیب', isSelected: true },
      // { field: 'dbInitialCatalog', header: 'ترتیب', isSelected: true }
    ]
  }
  /*API CALLS */
  getSectorsDataSource = (method: ENInterfaces): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(method).subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }

  getCountryDictionary = (): any => {
    return this.dictionaryWrapperService.getCountryDictionary();
  }
  getRegionDictionary = (): any => {
    return this.dictionaryWrapperService.getRegionDictionary();
  }
  getProvinceDictionary = (): any => {
    return this.dictionaryWrapperService.getProvinceDictionary();
  }
  getZoneDictionary = (): any => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }

  sectorsAddEdit = (apiUse: ENInterfaces, value: any) => {
    console.log(value);

    this.interfaceManagerService.POSTBODY(apiUse, value).subscribe((res: IResponses) => {
      if (res) {
        this.utilsService.snackBarMessageSuccess(res.message);
      }
    })
  }
  sectorsDelete = (apiUse: ENInterfaces, id: any) => {
    this.interfaceManagerService.POST(apiUse, id).subscribe((res: IResponses) => {
      if (res) {
        this.utilsService.snackBarMessageSuccess(res.message);
      }
    });
  }
  deleteSingleRow = (place: ENInterfaces, id: number) => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POST(place, id).subscribe((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(true);
      })
    });
  }
  firstConfirmDialog = (): Promise<any> => {
    const title = EN_messages.confirm_remove;
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        minWidth: '19rem',
        data: {
          title: title,
          isInput: false,
          isDelete: true
        }
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          resolve(desc);
        }
      })
    })
  }
  customizeSelectedColumns = (_selectCols: any[]) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  /*FOR COUNTRY */
  addOrEditCountry = (place: ENInterfaces, result: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(place, result).toPromise().then((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(res);
      })
    });
  }
  /* VALIDATION & VERIFICATION */
  verification = (dataSource: any): boolean => {
    this.sectionsService.setSectionsValue(dataSource);
    if (!this.sectionsService.sectionVertification())
      return false;
    return true;
  }

}
