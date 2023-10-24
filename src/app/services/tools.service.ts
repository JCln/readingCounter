import { Injectable } from '@angular/core';
import { ENRandomNumbers, ENSnackBarColors, ENSnackBarTimes, EN_messages } from 'interfaces/enums.enum';
import { ENReadingReports } from 'interfaces/reading-reports';

import { MathS } from '../classes/math-s';
import {
  ENAcceptVerb,
  ENJsonInfo,
  ENParamSendType,
  IAcceptVerb,
  IDynamicExcelReq,
  IJsonInfo,
  IParamSendType,
} from '../interfaces/itools';
import { IDownloadFileAllImages, IDownloadFileAllImagesTwo, IImageResultDetails, IRandomImages } from '../interfaces/tools';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { UtilsService } from './utils.service';
import { ITitleValue } from 'interfaces/ioverall-config';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  ENReadingReports = ENReadingReports;
  trackNumberAllImages: number;
  searchInOrder: any[] = [
    { name: 'شماره پرونده', value: 'radif', type: 'number' },
    { name: 'اشتراک', value: 'eshterak', type: 'number' },
    { name: 'وضعیت کنتور', value: 'counterStateTitle', type: 'string' },
  ]

  constructor(
    public utilsService: UtilsService,
    public dictionaryWrapperService: DictionaryWrapperService,
  ) { }

  public fileDownloadAllImages: IDownloadFileAllImages = {
    zoneId: null,
    day: ''
  }
  public fileDownloadAllImagesTwo2: IDownloadFileAllImagesTwo = {
    zoneId: null,
    fromDay: '',
    toDay: ''
  }
  public randomImages: IRandomImages = {
    userId: '',
    quantity: null,
    day: '',
    zoneId: null
  }
  public imgResultDetails: IImageResultDetails = {
    zoneId: null,
    fromDate: '',
    toDate: '',
    imageAttributionIds: []
  }
  public imgResultDetailsGridBased: IImageResultDetails = {
    zoneId: null,
    fromDate: '',
    toDate: '',
    imageAttributionIds: []
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
  receiveFromDateJalali2 = (event: string) => {
    this.fileDownloadAllImagesTwo2.fromDay = event;
  }
  receiveToDateJalali2 = (event: string) => {
    this.fileDownloadAllImagesTwo2.toDay = event;
  }
  /* to make Dates to work property 
  1- need to assign the exact name of the property
  2- name value exists in enum 
  3- the object which have variable live in this service and no other place because use 
  for e.g this[name].fromDate = event;
  */
  receiveFromDateJalaliD = (variable: ENReadingReports, $event: string) => {
    this[variable].fromDate = $event;
  }
  receiveToDateJalaliD = (variable: ENReadingReports, $event: string) => {
    this[variable].toDate = $event;
  }

  receiveFromDateJalaliImgResult = (event: string) => {
    this.imgResultDetails.fromDate = event;
  }
  receiveToDateJalaliImgResult = (event: string) => {
    this.imgResultDetails.toDate = event;
  }
  getQuantity = (): ITitleValue[] => {
    return [
      { title: '10', value: 10 },
      { title: '20', value: 20 },
      { title: '30', value: 30 }
    ];
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
  validationDownloadAllImagesTwo2 = (dataSource: IDownloadFileAllImagesTwo): boolean => {
    if (MathS.isNull(dataSource.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNull(dataSource.fromDay)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
      return false;
    }
    if (MathS.isNull(dataSource.toDay)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
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
    if (MathS.isNull(dataSource.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNull(dataSource.day)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_date);
      return false;
    }
    if (MathS.isNull(dataSource.quantity)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_quantity);
      return false;
    }
    if (MathS.isNaN(dataSource.quantity)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_numberLengths);
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
  verificationImageResultDetails = (dataSource: IImageResultDetails) => {
    if (MathS.isNull(dataSource.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNull(dataSource.fromDate)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
      return false;
    }
    if (MathS.isNull(dataSource.toDate)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
      return false;
    }

    if (!MathS.isExactLengthYouNeed(dataSource.fromDate, 10)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_isNotExactLengthNumber);
      return false;
    }
    if (!MathS.isExactLengthYouNeed(dataSource.toDate, 10)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_isNotExactLengthNumber);
      return false;
    }

    return true;
  }
  private followUPValidation = (id: number): boolean => {
    if (MathS.isNull(id)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_trackNumber);
      return false;
    }
    if (MathS.isNaN(id)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_trackNumber);
      return false;
    }
    if (!MathS.isLowerThanMinLength(id, ENRandomNumbers.two) || !MathS.isLowerThanMaxLength(id, ENRandomNumbers.ten)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_trackNumbersLength);
      return false;
    }
    return true;
  }
  verificationFollowUPTrackNumber = (id: number): boolean => {
    return this.followUPValidation(id);
  }
  showSnack = (message: string, color: ENSnackBarColors) => {
    this.utilsService.snackBarMessage(message, ENSnackBarTimes.fourMili, color);
  }

}
