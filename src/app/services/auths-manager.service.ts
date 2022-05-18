import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ENSelectedColumnVariables, IResponses } from 'interfaces/ioverall-config';
import { SectionsService } from 'services/sections.service';

import { ConfirmTextDialogComponent } from '../frame-work/manage/tracking/confirm-text-dialog/confirm-text-dialog.component';
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
    private utilsService: UtilsService,
    private dialog: MatDialog,
    private sectionsService: SectionsService
  ) { }

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
  deleteSingleRow = (place: ENInterfaces, id: number) => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POST(place, id).subscribe((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(true);
      })
    });
  }
  /* VERIFICATION & VALIDATION */
  verification = (dataSource: any): boolean => {
    this.sectionsService.setSectionsValue(dataSource);
    if (!this.sectionsService.sectionVertification())
      return false;
    return true;
  }

}
