import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils.service';

import { ConfirmTextDialogComponent } from '../frame-work/manage/tracking/confirm-text-dialog/confirm-text-dialog.component';
import { EN_messages } from '../Interfaces/enums.enum';
import { IDictionaryManager, IObjectIteratation, IResponses } from '../Interfaces/ioverall-config';
import { ENInterfaces } from './../Interfaces/en-interfaces.enum';
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
      this.interfaceManagerService.GET(ENInterfaces.CountryGET).subscribe(res => {
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
  deleteSingleRow = (data: number, place: string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService[place](data).toPromise().then((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(true);
      })
    });
  }
  editSingle
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
          isInput: false
        }
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
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
  addOrEditCountry = (result: any, place: string) => {
    this.interfaceManagerService[place](result).subscribe((res: IResponses) => {
      this.utilsService.snackBarMessageSuccess(res.message);
    })
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
