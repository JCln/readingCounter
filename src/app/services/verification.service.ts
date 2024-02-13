import { Injectable } from '@angular/core';
import { MathS } from '../classes/math-s';
import { UtilsService } from './utils.service';
import { EN_messages } from 'interfaces/enums.enum';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(
    public utilsService: UtilsService
  ) { }

  verificationZone(dataSource: any): boolean {
    if (dataSource.hasOwnProperty('zoneId')) {
      if (MathS.isNull(dataSource['zoneId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    }
    return true;
  }
  verificationZoneAndKind(zoneId: number, kindId: number): boolean {
    if (MathS.isNull(zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNull(kindId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriodKind);
      return false;
    }
    if (MathS.isNaN(zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNaN(kindId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriodKind);
      return false;
    }
    return true;
  }
}
