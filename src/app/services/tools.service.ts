import { Injectable } from '@angular/core';

import {
  ENAcceptVerb,
  ENJsonInfo,
  ENParamSendType,
  IAcceptVerb,
  IJsonInfo,
  IParamSendType,
} from '../interfaces/itools';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { UtilsService } from './utils.service';
import { ITitleValue } from 'interfaces/ioverall-config';
import { VerificationService } from './verification.service';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  trackNumberAllImages: number;
  searchInOrder: any[] = [
    { name: 'شماره پرونده', value: 'radif', type: 'number' },
    { name: 'اشتراک', value: 'eshterak', type: 'number' },
    { name: 'وضعیت کنتور', value: 'counterStateTitle', type: 'string' },
  ]

  constructor(
    public utilsService: UtilsService,
    public verificationService: VerificationService,
    public dictionaryWrapperService: DictionaryWrapperService,
  ) { }

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
  getQuantity = (): ITitleValue[] => {
    return [
      { title: '10', value: 10 },
      { title: '20', value: 20 },
      { title: '30', value: 30 }
    ];
  }

}
