import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ENSnackBarColors, ENSnackBarTimes, ITitleValue } from 'interfaces/ioverall-config';

import { MathS } from '../classes/math-s';
import { IRandomImages } from '../Interfaces/tools';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { InterfaceManagerService } from './interface-manager.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {


  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService,
    private dictionaryWrapperService: DictionaryWrapperService,
  ) { }

  public randomImages: IRandomImages = {
    userId: '',
    quantity: null,
    day: '',
    zoneId: null
  }
  getUserCounterReaders = (zoneId: number): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETByQuote(ENInterfaces.counterReadersByZoneId, zoneId).toPromise().then(res =>
        resolve(res))
    });
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
