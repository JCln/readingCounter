import { VerificationService } from './verification.service';
import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { ProfileService } from 'services/profile.service';
import { UtilsService } from 'services/utils.service';
import { MathS } from '../classes/math-s';
import {
  ConfirmDialogExcelViewComponent,
} from '../frame-work/reports/rr-excel-dynamic-viewer/confirm-dialog-checkbox/confirm-dialog-checkbox.component';
import { EN_Routes } from '../interfaces/routes.enum';
import { ConfirmDialogCheckboxComponent } from '../shared/confirm-dialog-checkbox/confirm-dialog-checkbox.component';
import { JwtService } from './../auth/jwt.service';
import { MapService } from './map.service';


@Injectable({
  providedIn: 'root'
})
export class ReadingReportManagerService {

  showGisInOrderTo: any[] = [
    {
      id: 'isCounterState',
      title: 'وضعیت کنتور',
      isSelected: true,
      key: 'A'
    },
    {
      id: 'isForbidden',
      title: 'غیر مجاز',
      isSelected: false,
      key: 'B'
    },
    {
      id: 'isAhadChange',
      title: 'تغییر آحاد',
      isSelected: false,
      key: 'C'
    },
    {
      id: 'isKarbariChange',
      title: 'تغییر کاربری',
      isSelected: false,
      key: 'D'
    }
  ]
  _orderByGIS: string = 'isCounterState';

  constructor(
    public utilsService: UtilsService,
    public dictionaryWrapperService: DictionaryWrapperService,
    private jwtService: JwtService,
    private mapService: MapService,
    public profileService: ProfileService,
    public ajaxReqWrapperService: AjaxReqWrapperService,
    public verificationService: VerificationService
  ) { }

  getAuthToken = (): string => {
    return this.jwtService.getAccessToken();
  }
  successSnackMessage = (message: string) => {
    this.utilsService.snackBarMessageSuccess(message);
  }
  routeTo = (route: string) => {
    this.utilsService.routeTo(route);
  }
  linkToStimulsoftAdd = () => {
    window.open(this.utilsService.getAPIUrl() + ENInterfaces.dynamicReportManagerDisplayLinkAdd + this.getAuthToken(), ENInterfaces._blank);
  }
  linkToStimulsoftEdit = (body: any) => {
    window.open(this.utilsService.getAPIUrl() + ENInterfaces.dynamicReportManagerDisplayLinkEdit + '/' + body.id + '/' + ENInterfaces.accessTokenTile + this.getAuthToken(), ENInterfaces._blank);
  }
  linkToStimulsoftView = (body: any) => {
    window.open(this.utilsService.getAPIUrl() + ENInterfaces.dynamicReportManagerDisplayLink + '/' + body.id + + '/' + ENInterfaces.accessTokenTile + this.getAuthToken(), ENInterfaces._blank);
  }
  routeToMapGIS = async (readingReportGISReq: any) => {
    // insert into gis request and should valiation before route to map    
    const temp = await this.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ListToGis, readingReportGISReq);
    if (temp.length) {
      this.mapService.gisReqAux = readingReportGISReq;
      this.mapService.responseGisAux.value = temp;
      this.utilsService.compositeService.routeToExtras([EN_Routes.wr, readingReportGISReq]);
    }
    else {
      this.utilsService.snackBarMessageFailed(EN_messages.notFound);
    }
  }
  getFragmentMastersInZones = async (value: any): Promise<any> => {
    if (!MathS.isNull(value))
      return await this.dictionaryWrapperService.getFragmentMasterInZonesDictionary(
        this.utilsService.getZoneHierarical(value)
      );
  }
  showResDialog = (res: any[], disableClose: boolean, title: string): Promise<any> => {
    // disable close mean when dynamic count show decision should make
    return new Promise((resolve) => {
      const dialogRef = this.utilsService.dialog.open(ConfirmDialogCheckboxComponent,
        {
          disableClose: disableClose,
          minWidth: '65vw',
          data: {
            data: res,
            title: title
          }
        });
      dialogRef.afterClosed().subscribe(async result => {
        if (disableClose) {
          if (result) {
            resolve(true);
          }
        }
      })
    });
  }
  showResDialogDynamic = (res: any, options: any): Promise<any> => {
    // disable close mean when dynamic count show decision should make
    return new Promise((resolve) => {
      const dialogRef = this.utilsService.dialog.open(ConfirmDialogExcelViewComponent,
        {
          disableClose: options.disableClose,
          minWidth: '21rem',
          data: {
            data: res,
            title: options.title,
            buttonText: options.buttonText,
            buttonColor: options.buttonColor
          }
        });
      dialogRef.afterClosed().subscribe(async result => {
        console.log(result);

        if (result) {
          resolve(result);
        }
      })
    });
  }
  firstConfirmDialogRemove = (text?: string) => {
    const a = {
      messageTitle: EN_messages.confirm_remove,
      minWidth: '19rem',
      isInput: false,
      isDelete: true,
      text: text,
      icon: 'pi pi-trash'
    }
    return this.utilsService.firstConfirmDialog(a);
  }

}
