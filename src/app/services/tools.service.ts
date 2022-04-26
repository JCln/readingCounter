import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ENSnackBarColors, ENSnackBarTimes, ITitleValue } from 'interfaces/ioverall-config';

import { MathS } from '../classes/math-s';
import {
  ENAcceptVerb,
  ENJsonInfo,
  ENParamSendType,
  IAcceptVerb,
  IDynamicExcelReq,
  IJsonInfo,
  IParamSendType,
} from '../Interfaces/itools';
import { IDownloadFileAllImages, IRandomImages } from '../Interfaces/tools';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { InterfaceManagerService } from './interface-manager.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  _isCollapseFileDownloadImage: boolean = false;
  _isCollapsedRandomImages: boolean = false;

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService,
    private dictionaryWrapperService: DictionaryWrapperService
  ) { }

  public fileDownloadAllImages: IDownloadFileAllImages = {
    zoneId: null,
    day: ''
  }
  public randomImages: IRandomImages = {
    userId: '',
    quantity: null,
    day: '',
    zoneId: null
  }
  public dynamicReq: IDynamicExcelReq = {
    id: 0,
    title: '',
    description: '',
    url: '',
    acceptVerb: '',
    jsonInfo: '',
    paramSendType: '',
    // createDateTime: '',
    // isActive: false
  }
  methods: IAcceptVerb[] = [
    { id: 1, name: 'DELETE', method: ENAcceptVerb.DELETE },
    { id: 2, name: 'PUT', method: ENAcceptVerb.PUT },
    { id: 3, name: 'POST', method: ENAcceptVerb.POST },
    { id: 4, name: 'GET', method: ENAcceptVerb.GET },
  ];
  jsonInfo: IJsonInfo[] = [
    { id: 1, name: 'از تاریخ', value: ENJsonInfo.fromDate },
    { id: 2, name: 'تا تاریخ', value: ENJsonInfo.toDate },
    { id: 3, name: 'تاریخ', value: ENJsonInfo.jalaliDate },
    { id: 4, name: 'ناحیه', value: ENJsonInfo.zoneId },
    { id: 5, name: 'کاربری', value: ENJsonInfo.karbari },
    { id: 6, name: 'از مصرف', value: ENJsonInfo.fromMasraf },
    { id: 7, name: 'تا مصرف', value: ENJsonInfo.toMasraf },
    { id: 8, name: 'مصرف', value: ENJsonInfo.masraf },
  ];
  paramSendType: IParamSendType[] = [
    { id: 1, name: 'fromBody', type: ENParamSendType.fromBody },
    { id: 2, name: 'fromForm ', type: ENParamSendType.fromForm },
    { id: 3, name: 'fromQuery ', type: ENParamSendType.fromQuery },
    { id: 4, name: 'fromURI ', type: ENParamSendType.fromURI },
  ];

  getUserCounterReaders = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getUserCounterReaderDictionary(zoneId);
  }
  getZoneDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  validationOnNull = (val: any): boolean => {
    if (MathS.isNull(val))
      return false;
    return true;
  }
  receiveFromDateJalali = ($event: string) => {
    this.randomImages.day = $event;
  }
  receiveDateJalali = (event: string) => {
    this.fileDownloadAllImages.day = event;
  }
  getQuantity = (): ITitleValue[] => {
    return this.utilsService.getQuantity();
  }
  postDataSource = (api: ENInterfaces, body: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(api, body).toPromise().then(res =>
        resolve(res))
    });
  }
  getDataSource = (api: ENInterfaces, body: string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETID(api, body).toPromise().then(res =>
        resolve(res))
    });
  }
  validationDownloadAllImages = (dataSource: IDownloadFileAllImages): boolean => {
    if (MathS.isNull(dataSource.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNull(dataSource.day)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_date);
      return false;
    }

    return true;
  }
  verificationExcelBuilder = (dataSource: IDynamicExcelReq) => {
    if (MathS.isNull(dataSource.title)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_title);
      return false;
    }
    if (MathS.isNull(dataSource.description)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_desc);
      return false;
    }
    if (MathS.isNull(dataSource.url)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_url);
      return false;
    }
    if (MathS.isNull(dataSource.acceptVerb)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_AcceptVerbs);
      return false;
    }
    if (MathS.isNull(dataSource.jsonInfo)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_jsonInfo);
      return false;
    }
    if (MathS.isNull(dataSource.paramSendType)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_parameterSendType);
      return false;
    }

    return true;
  }
  verificationImageCarousel = (dataSource: IRandomImages) => {
    if (MathS.isNull(dataSource.day)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_date);
      return false;
    }
    if (MathS.isNull(dataSource.quantity)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_quantity);
      return false;
    }
    if (MathS.isNull(dataSource.userId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_reader);
      return false;
    }

    if (!MathS.isExactLengthYouNeed(dataSource.day, 10)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_isNotExactLengthNumber);
      return false;
    }

    return true;
  }
  showSnack = (message: string, color: ENSnackBarColors) => {
    this.utilsService.snackBarMessage(message, ENSnackBarTimes.fourMili, color);
  }

}
