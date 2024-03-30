import { Injectable } from '@angular/core';
import { MathS } from '../classes/math-s';
import { UtilsService } from './utils.service';
import { ENRandomNumbers, EN_messages } from 'interfaces/enums.enum';
import { IBranchState, IClientAll } from 'interfaces/i-branch';
import { IFileExcelReq, IImportDynamicDefault, IImportSimafaBatchReq, IImportSimafaReadingProgramsReq, IImportSimafaSingleReq } from 'interfaces/import-data';
import { IAssessAddDtoSimafa, IReadingConfigDefault } from 'interfaces/iimports';
import { IMostReportInput, IOutputManager } from 'interfaces/imanage';
import { IOffloadModifyReq } from 'interfaces/inon-manage';
import { IReadingReportGISReq, IUserKarkardInput, IReadingReportReq, IReadingReportTraverseDifferentialReq } from 'interfaces/ireports';

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
  verificationAssessPre = (searchReq: any): boolean => {
    if (searchReq.hasOwnProperty('zoneId')) {
      if (MathS.isNull(searchReq.zoneId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    }
    if (searchReq.hasOwnProperty('listNumber')) {
      if (MathS.isNull(searchReq.listNumber)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_listNumber);
        return false;
      }
    }
    return true;
  }
  verificationReadingConfigDefault = (val: IReadingConfigDefault, insertedVals: any): boolean => {
    if (val.minAlalHesab > insertedVals.alalHesabPercent) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_defaultMinAlalHesab);
      return false;
    }
    if (val.minImagePercent > insertedVals.imagePercent) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_defaultMinImg);
      return false;
    }
    if (val.maxAlalHesab < insertedVals.alalHesabPercent) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_defaultMaxAlalHesab);
      return false;
    }
    if (val.maxImagePercent < insertedVals.imagePercent) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_defaultMaxImg);
      return false;
    }
    return true;
  }
  validationOnNull = (val: any): boolean => {
    if (MathS.isNull(val))
      return false;
    return true;
  }
  private NANValidation = (sth: string, message?: EN_messages): boolean => {
    if (MathS.isNaN(sth)) {
      if (message)
        this.utilsService.snackBarMessageWarn(message);
      return false;
    }
    return true;
  }
  checkExcelFileVertification = (val: IFileExcelReq): boolean => {
    if (!MathS.persentCheck(val.alalHesabPercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.percent_alalhesab);
      return false;
    }
    if (!MathS.persentCheck(val.imagePercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.percent_pictures);
      return false;
    }
    if (MathS.isNull(val.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_reading_time);
      return false;
    }
    if (MathS.isNull(val.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_year);
      return false;
    }
    if (MathS.isNull(val.counterReaderId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_reader);
      return false;
    }
    return true;
  }
  validateSimafaBatch = (val: IImportSimafaBatchReq): boolean => {
    if (MathS.isNull(val.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNull(val.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNull(val.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }

    if (MathS.isNull(val.readingProgramId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNull(val.fragmentMasterId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNaN(val.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNaN(val.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNaN(val.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNaN(val.alalHesabPercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_alalhesab);
      return false;
    }
    if (MathS.isNaN(val.imagePercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_imagePercent);
      return false;
    }
    if (!MathS.persentCheck(val.alalHesabPercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.percent_alalhesab);
      return false;
    }
    if (!MathS.persentCheck(val.imagePercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.percent_pictures);
      return false;
    }

    return true;
  }
  private validateSimafaBatchHaveSelectedCounterReaders = (val: IImportSimafaBatchReq): boolean => {
    return val.routeAndReaderIds.every(item => {
      return item.counterReaderId !== null
    })
  }

  verificationSimafaBatch = (val: IImportSimafaBatchReq) => {
    if (!this.validateSimafaBatchHaveSelectedCounterReaders(val)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_allReaders);
      return false;
    }
    if (!this.validateSimafaBatch(val)) {
      return false;
    }

    return true;
  }
  checkSimafaSingleVertification = (val: IImportSimafaSingleReq): boolean => {
    // call support group because inserted in previous section and readonly
    if (MathS.isNull(val.readingProgramId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNull(val.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNull(val.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNull(val.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNull(val.counterReaderId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_reader);
      return false;
    }
    if (MathS.isNaN(val.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNaN(val.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriod);
      return false;
    }
    if (MathS.isNaN(val.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNaN(val.alalHesabPercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_alalhesab);
      return false;
    }
    if (MathS.isNaN(val.imagePercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_imagePercent);
      return false;
    }

    return true;
  }
  validationInvalid = (val: any, message: EN_messages): boolean => {
    if (!this.validationOnNull(val)) {
      this.utilsService.snackBarMessageFailed(message);
      return false;
    }
    return true;
  }
  verificationAssessAdd = (assessData: IAssessAddDtoSimafa): boolean => {
    if (MathS.isNull(assessData.onOffLoadIds[0])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_assessAdd);
      return false;
    }
    if (MathS.isNull(assessData.counterReaderId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_reader);
      return false;
    }
    return true;
  }
  verificationTrackNumber = (id: number): boolean => {
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
  persentCheck = (val: number): boolean => {
    if (MathS.persentCheck(val))
      return true;
    return false;
  }
  checkVertification = (val: IImportDynamicDefault, _isOrderByDate: boolean): boolean => {
    if (!MathS.isSameLength(val.fromEshterak, val.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.sameLength_eshterak);
      return false;
    }

    if (!this.NANValidation(val.fromEshterak, EN_messages.format_invalid_from_eshterak))
      return false;
    if (!this.NANValidation(val.fromEshterak, EN_messages.format_invalid_to_eshterak))
      return false;

    if (!MathS.lengthControl(val.fromEshterak, val.toEshterak, 5, 15)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_esterak);
      return false;
    }
    if (!MathS.isFromLowerThanToByString(val.fromEshterak, val.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.lessThan_eshterak);
      return false;
    }
    if (!this.persentCheck(val.imagePercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.percent_pictures);
      return false;
    }
    if (!this.persentCheck(val.alalHesabPercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.percent_alalhesab);
      return false;
    }
    if (!_isOrderByDate) {
      if (!this.validationOnNull(val.readingPeriodId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_reading_time);
        return false;
      }
    }
    if (!this.validationOnNull(val.counterReaderId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_reader);
      return false;
    }
    return true;
  }
  checkSimafaVertification = (dataSource: IImportSimafaReadingProgramsReq): boolean => {
    if (MathS.isNull(dataSource.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNull(dataSource.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriod);
      return false;
    }
    if (MathS.isNull(dataSource.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_year);
      return false;
    }
    if (MathS.isNaN(dataSource.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNaN(dataSource.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriod);
      return false;
    }
    if (MathS.isNaN(dataSource.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_year);
      return false;
    }

    return true;
  }
  verificationExcelFile = (fileForm: FileList): boolean => {
    if (MathS.isNull(fileForm)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_excelFile);
      return false;
    }
    if (fileForm[0].name.split('.').pop() !== 'xlsx') {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_excel);
      return false;
    }
    return true;
  }
  stateVerification = (dataSource: IBranchState): boolean => {
    if (MathS.isNull(dataSource.title)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_title);
      return false;
    }
    return true;
  }
  clientAdd = (body: IClientAll): boolean => {
    if (MathS.isNull(body.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNull(body.nationalId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_nationaId);
      return false;
    }
    if (MathS.isNull(body.fullName)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_fullName);
      return false;
    }
    if (MathS.isNull(body.readingNumber)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_readingNumber);
      return false;
    }
    if (MathS.isNull(body.usageId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_usage);
      return false;
    }
    if (MathS.isNull(body.branchDiameterId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_Diameter);
      return false;
    }
    if (MathS.isNull(body.siphon1Count)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_siphon1);
      return false;
    }
    if (MathS.isNull(body.siphon2Count)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_siphon2);
      return false;
    }
    if (MathS.isNull(body.siphon3Count)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_siphon3);
      return false;
    }
    if (MathS.isNull(body.siphon4Count)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_siphon4);
      return false;
    }
    if (MathS.isNull(body.domesticArea)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_domesticArea);
      return false;
    }
    if (MathS.isNull(body.domesticCount)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_domesticCount);
      return false;
    }
    if (MathS.isNull(body.commercialCount)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_commercialCount);
      return false;
    }
    if (MathS.isNull(body.commercialArea)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_commercialArea);
      return false;
    }
    if (MathS.isNull(body.otherCount)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_otherCount);
      return false;
    }
    if (MathS.isNull(body.familyCount)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_familyCount);
      return false;
    }
    if (MathS.isNull(body.otherArea)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_otherArea);
      return false;
    }
    if (MathS.isNull(body.ownershipTypeId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insertـownershipTypeId);
      return false;
    }
    if (MathS.isNull(body.branchStateId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insertـbranchStateId);
      return false;
    }
    if (MathS.isNull(body.customerTypeId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insertـcustomerTypeId);
      return false;
    }
    if (MathS.isNull(body.address)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_address);
      return false;
    }
    if (!MathS.isLowerThanMinLength(body.address, ENRandomNumbers.eighteen)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_address);
      return false;
    }
    if (!MathS.isExactLengthYouNeed(body.watarInstallationJalaliDay, ENRandomNumbers.ten)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_isNotExactLengthEndTime);
      return false;
    }
    if (!MathS.isExactLengthYouNeed(body.postalCode, ENRandomNumbers.ten)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_postalCode);
      return false;
    }
    if (!MathS.postalCodeValidation(body.postalCode)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_postalCode);
      return false;
    }
    if (!MathS.validationMobiles(body.mobiles)) {
      this.utilsService.snackBarMessageWarn(EN_messages.invalid_mobileFormat);
      return false;
    }
    if (!MathS.validateNationalId(body.nationalId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.incorrect_nationalId);
      return false;
    }

    return true;
  }
  isValidationNull = (elem: any): boolean => {
    if (MathS.isNull(elem))
      return true;
    return false;
  }
  checkVertificationDBF = (dataSource: IOutputManager): boolean => {
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
    return true;
  }
  checkVertificationDBFEqamatBagh = (dataSource: any): boolean => {
    if (MathS.isNull(dataSource.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    return true;
  }
  offloadModifyValidation = (object: IOffloadModifyReq): boolean => {
    if (this.isValidationNull(object.id)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (this.isValidationNull(object.jalaliDay)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_date);
      return false;
    }
    if (MathS.isNullZero(object.modifyType)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_modify_type);
      return false;
    }
    if (this.isValidationNull(object.counterNumber)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_counterNumber);
      return false;
    }
    if (!MathS.lengthControl(object.counterNumber, object.counterNumber, 1, 7)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_counterNumberTimes);
      return false;
    }
    return true;
  }
  followUPValidation = (id: number): boolean => {
    if (this.isValidationNull(id)) {
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
  /* VERIFICATION */
  validationImportedEdited = (dataSource: object): boolean => {
    if (dataSource.hasOwnProperty('zoneId')) {
      if (MathS.isNull(dataSource['zoneId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('fromDate')) {
      if (MathS.isNull(dataSource['fromDate'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
        return false;
      }
      if (!MathS.lengthControl(dataSource['fromDate'], dataSource['fromDate'], 9, 10)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_fromDate);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('toDate')) {
      if (MathS.isNull(dataSource['toDate'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
        return false;
      }
      if (!MathS.lengthControl(dataSource['toDate'], dataSource['toDate'], 9, 10)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_toDate);
        return false;
      }
      if (dataSource.hasOwnProperty('alalHesabPercent')) {
        if (MathS.isNullZero(dataSource['alalHesabPercent'])) {
          this.utilsService.snackBarMessageWarn(EN_messages.format_alalhesab);
          return false;
        }
      }
      if (dataSource.hasOwnProperty('imagePercent')) {
        if (MathS.isNullZero(dataSource['imagePercent'])) {
          this.utilsService.snackBarMessageWarn(EN_messages.format_imagePercent);
          return false;
        }
      }
    }
    return true;
  }
  userKarkardValidation = (dataSource: object): boolean => {
    if (MathS.isNull(dataSource['zoneId'])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNull(dataSource['fromDate'])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
      return false;
    }
    if (MathS.isNull(dataSource['toDate'])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
      return false;
    }
    return true;
  }
  private datesValidation = (dataSource: object): boolean => {
    if (dataSource.hasOwnProperty('zoneId')) {
      if (MathS.isNull(dataSource['zoneId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('statusId')) {
      if (MathS.isNull(dataSource['statusId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_statusId);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('fromDate')) {
      if (MathS.isNull(dataSource['fromDate'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
        return false;
      }
      if (!MathS.lengthControl(dataSource['fromDate'], dataSource['fromDate'], 9, 10)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_fromDate);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('toDate')) {
      if (MathS.isNull(dataSource['toDate'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
        return false;
      }
      if (!MathS.lengthControl(dataSource['toDate'], dataSource['toDate'], 9, 10)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_toDate);
        return false;
      }
    }

    return true;
  }
  showInMapSingleValidation = (dataSource: any): boolean => {
    if (MathS.isNull(dataSource.gisAccuracy) || parseInt(dataSource.gisAccuracy) > ENRandomNumbers.twoHundred || MathS.isNull(parseInt(dataSource.gisAccuracy))) {
      this.utilsService.snackBarMessageWarn(EN_messages.gisAccuracy_insufficient);
      return false;
    }
    return true;
  }
  private periodValidations = (dataSource: object): boolean => {
    if (dataSource.hasOwnProperty('zoneId'))
      if (MathS.isNull(dataSource['zoneId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    if (dataSource.hasOwnProperty('readingPeriodId'))
      if (MathS.isNull(dataSource['readingPeriodId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriod);
        return false;
      }
    if (dataSource.hasOwnProperty('year'))
      if (MathS.isNull(dataSource['year'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_year);
        return false;
      }
    return true;
  }
  private periodValidationGIS = (readingReportGISReq: IReadingReportGISReq): boolean => {
    if (readingReportGISReq.hasOwnProperty('zoneId'))
      if (MathS.isNull(readingReportGISReq['zoneId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    if (readingReportGISReq.isForbidden === true) {
      this.utilsService.snackBarMessageWarn(EN_messages.allowed_forbiddenByDate);
      return false;
    }
    if (readingReportGISReq.isCounterState === true) {
      if (MathS.isNull(readingReportGISReq.counterStateId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_counterState);
        return false;
      }
    }
    return true;
  }

  // VerificationS 
  verificationUserKarkard = (readingReportReq: IUserKarkardInput): boolean => {
    return this.datesValidation(readingReportReq);
  }
  verificationRRShared = (readingReportReq: IReadingReportReq, isValidateByDate: boolean): boolean => {
    return isValidateByDate ? (readingReportReq.readingPeriodId = null, this.datesValidation(readingReportReq)) : this.periodValidations(readingReportReq)
  }
  verificationRRTraverseDifferential = (readingReportReq: IReadingReportTraverseDifferentialReq, isValidateByDate: boolean): boolean => {
    return isValidateByDate ? (readingReportReq.readingPeriodId = null, this.datesValidation(readingReportReq)) : this.periodValidations(readingReportReq)
  }
  verificationRRDisposalHours = (readingReportReq: IReadingReportReq): boolean => {
    return this.datesValidation(readingReportReq);
  }
  verificationRRGIS = (readingReportGISReq: IReadingReportGISReq, isValidateByDate: boolean): boolean => {
    if (isValidateByDate) {
      readingReportGISReq.readingPeriodId = null;
      if (readingReportGISReq.hasOwnProperty('isCounterState')) {
        if (readingReportGISReq.isCounterState === true) {
          if (MathS.isNull(readingReportGISReq.counterStateId)) {
            this.utilsService.snackBarMessageWarn(EN_messages.insert_counterState);
            return false;
          }
        }
      }
      return this.datesValidation(readingReportGISReq);
    }
    else {
      return this.periodValidationGIS(readingReportGISReq);
    }
  }
  verificationRRAnalyzePerformance = (readingReportReq: IMostReportInput, isValidateByDate: boolean): boolean => {
    return isValidateByDate ? (readingReportReq.readingPeriodId = null, this.datesValidation(readingReportReq)) : this.periodValidations(readingReportReq)
  }


}
