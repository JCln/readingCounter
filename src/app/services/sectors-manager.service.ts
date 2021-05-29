import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { UtilsService } from 'src/app/services/utils.service';

import { ConfirmTextDialogComponent } from '../frame-work/manage/tracking/confirm-text-dialog/confirm-text-dialog.component';
import { EN_messages } from '../Interfaces/enums.enum';
import { IDictionaryManager, IObjectIteratation, IResponses } from '../Interfaces/ioverall-config';
import { ConverterService } from './converter.service';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { InterfaceManagerService } from './interface-manager.service';

@Injectable({
  providedIn: 'root'
})
export class SectorsManagerService {

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private converterService: ConverterService,
    private utilsService: UtilsService,
    private dialog: MatDialog,
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
      { field: 'countryId', header: 'کشور', isSelected: true },
      { field: 'logicalOrder', header: 'ترتیب', isSelected: true },
    ]
  }
  columnRegion = (): IObjectIteratation[] => {
    return [
      { field: 'title', header: 'عنوان', isSelected: true },
      { field: 'provinceId', header: 'استان', isSelected: true },
      { field: 'logicalOrder', header: 'ترتیب', isSelected: true }
    ]
  }
  columnZone = (): IObjectIteratation[] => {
    return [
      { field: 'title', header: 'عنوان', isSelected: true },
      { field: 'regionId', header: 'منطقه', isSelected: true },
      { field: 'isMetro', header: 'شهری', isSelected: true },
      { field: 'logicalOrder', header: 'ترتیب', isSelected: true }
    ]
  }
  columnZoneBound = (): IObjectIteratation[] => {
    return [
      { field: 'title', header: 'عنوان', isSelected: true },
      { field: 'zoneId', header: 'ناحیه', isSelected: true },
      // { field: 'govermentalCode', header: 'کشور', isSelected: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: true },
      // { field: 'fromRadif', header: 'عنوان', isSelected: true },
      // { field: 'toRadif', header: 'کشور', isSelected: true },
      // { field: 'host', header: 'ترتیب', isSelected: true },
      // { field: 'dbUserName', header: 'ترتیب', isSelected: true },
      // { field: 'dbPassword', header: 'ترتیب', isSelected: true },
      // { field: 'dbInitialCatalog', header: 'ترتیب', isSelected: true }
    ]
  }
  /*API CALLS */
  getProvinceDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.ProvinceGET).subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  getZoneDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.ZoneGET).subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  getZoneBoundDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.ZoneBoundGET).subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  getRegionDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.RegionGET).subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  getCountryDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.CountryGET).toPromise().then(res => {
        resolve(res);
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

  convertIdToTitle = (dataSource: any, dictionary: IDictionaryManager[], toConvert: string) => {
    this.converterService.convertIdToTitle(dataSource, dictionary, toConvert);
  }
  deleteSingleRow = (place: ENInterfaces, id: number) => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POST(place, id).subscribe((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(true);
      })
    });
  }
  // private deleteDialog = () => {
  //   return new Promise(resolve => {
  //     const dialogRef = this.dialog.open(DeleteDialogComponent);
  //     dialogRef.afterClosed().subscribe(result => {
  //       resolve(result)
  //     });
  //   });
  // }
  // deleteSingleRowCountry = async (row: ICountryManager) => {
  //   const dialogResult = await this.deleteDialog();
  //   if (dialogResult) {
  //     this.interfaceManagerService.deleteCountryManager(row.id).subscribe((res: IResponses) => {
  //       if (res) {
  //         this.utilsService.snackBarMessageSuccess(res.message);
  //       }
  //     });
  //   }
  // }
  firstConfirmDialog = () => {
    const title = EN_messages.delete_confirm;
    return new Promise(() => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        data: {
          title: title,
          isInput: false,
          isDelete: true
        }
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          console.log(desc);
          return desc;
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
  addOrEditCountry = (place: ENInterfaces, result: object) => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(place, result).toPromise().then((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(res);
      })
    });
  }
  /* VALIDATION */
  validationEditableRow = (dataSource: object): boolean => {
    if (this.utilsService.isNull(dataSource['id'])) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (this.utilsService.hasOwnProperty(dataSource['zoneId'])) {
      if (this.utilsService.isNull(dataSource['zoneId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['title'])) {
      if (this.utilsService.isNull(dataSource['title'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_title);
        return false;
      }
    }
    return true;
  }
  /* VERFIFICATION */
  verificationSingleRow = () => {

  }
  verificationEditedRow = (dataSource: object): boolean => {
    if (!this.validationEditableRow(dataSource))
      return false;
    return true;
  }

}
