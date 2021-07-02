import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SectionsService } from 'src/app/services/sections.service';

import { ConfirmTextDialogComponent } from '../frame-work/manage/tracking/confirm-text-dialog/confirm-text-dialog.component';
import { ENInterfaces } from '../Interfaces/en-interfaces.enum';
import { EN_messages } from '../Interfaces/enums.enum';
import {
  ENSelectedColumnVariables,
  IDictionaryManager,
  IObjectIteratation,
  IResponses,
} from '../Interfaces/ioverall-config';
import { ConverterService } from './converter.service';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { InterfaceManagerService } from './interface-manager.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthsManagerService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private converterService: ConverterService,
    private utilsService: UtilsService,
    private dialog: MatDialog,
    private sectionsService: SectionsService
  ) { }

  /* COLUMNS */
  private _auth1: IObjectIteratation[] = [
    { field: 'title', header: 'عنوان', isSelected: true },
    { field: 'logicalOrder', header: 'ترتیب', isSelected: true },
    { field: 'inSidebar', header: 'سایدبار', isSelected: false, isBoolean: true }
  ];
  private _auth2: IObjectIteratation[] = [
    { field: 'title', header: 'عنوان', isSelected: true },
    { field: 'authLevel1Id', header: 'app', isSelected: true, isSelectOption: true },
    { field: 'cssClass', header: 'کلاس css', isSelected: false },
    { field: 'inSidebar', header: 'سایدبار', isSelected: false, isBoolean: true },
    { field: 'logicalOrder', header: 'ترتیب', isSelected: true }
  ];
  private _auth3: IObjectIteratation[] = [
    { field: 'title', header: 'عنوان', isSelected: true },
    { field: 'authLevel2Id', header: 'ماژول', isSelected: true, isSelectOption: true },
    { field: 'cssClass', header: 'کلاس css', isSelected: false },
    { field: 'route', header: 'مسیر', isSelected: true, ltr: true },
    { field: 'logicalOrder', header: 'ترتیب', isSelected: true },
    { field: 'inSidebar', header: 'سایدبار', isSelected: false, isBoolean: true },
    { field: 'isClosable', header: 'قابل بستن', isSelected: false, isBoolean: true },
    { field: 'isRefreshable', header: 'قابل refresh', isSelected: false, isBoolean: true }
  ];
  private _auth4: IObjectIteratation[] = [
    { field: 'title', header: 'عنوان', isSelected: true },
    { field: 'authLevel3Id', header: 'کنترلر', isSelected: true, isSelectOption: true },
    { field: 'value', header: 'مقدار', isSelected: false },
    { field: 'cssClass', header: 'کلاس css', isSelected: false },
    { field: 'logicalOrder', header: 'ترتیب', isSelected: true },
    { field: 'isSidebar', header: 'در سایدبار', isSelected: false, isBoolean: true }
  ];

  columnAuth1 = (): IObjectIteratation[] => {
    return this._auth1;
  }
  columnAuth2 = (): IObjectIteratation[] => {
    return this._auth2;
  }
  columnAuth3 = (): IObjectIteratation[] => {
    return this._auth3;
  }
  columnAuth4 = (): IObjectIteratation[] => {
    return this._auth4;
  }
  /* API CALSS */
  getAuth1DataSource = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GET(ENInterfaces.AuthLevel1GET).subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(error);
    }
  }
  getAuth4DataSource = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GET(ENInterfaces.AuthLevel4GET).subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(error);
    }
  }
  getAuth3DataSource = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GET(ENInterfaces.AuthLevel3GET).subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(error);
    }
  }
  getAuth2DataSource = (): any => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GET(ENInterfaces.AuthLevel2GET).subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(error);
    }
  }

  getAuthLevel1Dictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getAuthLev1Dictionary();
  }
  getAuthLevel2Dictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getAuthLev2Dictionary();
  }
  getAuthLevel3Dictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getAuthLev3Dictionary();
  }

  /* */
  addOrEditAuths = (place: ENInterfaces, result: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(place, result).toPromise().then((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(res);
      })
    });
  }
  firstConfirmDialog = (): Promise<any> => {
    const title = EN_messages.confirm_remove;
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
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
  deleteSingleRow = (place: ENInterfaces, id: number) => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POST(place, id).subscribe((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(true);
      })
    });
  }
  convertIdToTitle = (dataSource: any, dictionary: IDictionaryManager[], toConvert: string) => {
    this.converterService.convertIdToTitle(dataSource, dictionary, toConvert);
  }
  customizeSelectedColumns = (_selectCols: any[]) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  /* VERIFICATION & VALIDATION */
  verification = (dataSource: any): boolean => {
    this.sectionsService.setSectionsValue(dataSource);
    if (!this.sectionsService.sectionVertification())
      return false;
    return true;
  }
  setColumnsChanges = (variableName: string, newValues: IObjectIteratation[]) => {
    // convert all items to false
    this[variableName].forEach(old => {
      old.isSelected = false;
    })

    // merge new values
    this[variableName].find(old => {
      newValues.find(newVals => {
        if (newVals.field == old.field)
          old.isSelected = true;
      })
    })
  }

}
