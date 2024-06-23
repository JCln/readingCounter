import { Injectable } from '@angular/core';
import { MathS } from '../classes/math-s';
import { UtilsService } from './utils.service';
import { ENRandomNumbers, ENSnackBarColors, EN_messages } from 'interfaces/enums.enum';
import { IBank, IBranchState, IClientAll, IFlowRule, IFlowState, IInvoiceType, IOffering, IOfferingGroup, IOfferingUnit, IRequestDraft, IScheduledPaymentMethod, ITariffAll, ITariffExcelToFillInput, ITariffType, ITarrifParameter, ITarrifTypeItem, IVillage } from 'interfaces/i-branch';
import { IFileExcelReq, IImportDynamicDefault, IImportSimafaBatchReq, IImportSimafaReadingProgramsReq, IImportSimafaSingleReq } from 'interfaces/import-data';
import { IAssessAddDtoSimafa, IReadingConfigDefault } from 'interfaces/iimports';
import { IMostReportInput, IOutputManager } from 'interfaces/imanage';
import { INotifyDirectImage, IOffloadModifyReq } from 'interfaces/inon-manage';
import { IReadingReportGISReq, IUserKarkardInput, IReadingReportReq, IReadingReportTraverseDifferentialReq } from 'interfaces/ireports';
import { IAUserEditSave, IAddAUserManager, IUserEditOnRole } from 'interfaces/iuser-manager';
import { IIOPolicy } from 'interfaces/iserver-manager';
import { IAutomaticImportAddEdit, IFragmentDetails, IFragmentMaster } from 'interfaces/ireads-manager';
import { IDownloadFileAllImages, IDownloadFileAllImagesTwo, IImageResultDetails, IRandomImages } from 'interfaces/tools';
import { IDynamicExcelReq } from 'interfaces/itools';
import { IPolicies } from './DI/privacies';

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
    if (MathS.isNull(body.siphonId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_siphon);
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
    if (!MathS.isLowerThanMinLength(body.address, ENRandomNumbers.ten)) {
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
  requestDraftValidation = (body: IRequestDraft): boolean => {
    if (!MathS.isExactLengthYouNeed(body.postalCode, ENRandomNumbers.ten)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_postalCode);
      return false;
    }
    if (!MathS.postalCodeValidation(body.postalCode)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_postalCode);
      return false;
    }
    
    return true;
  }
  requestDraftPersonal = (body: IRequestDraft): boolean => {
    if (MathS.isNull(body.fullName)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_fullName);
      return false;
    }
    if (MathS.isNull(body.fatherName)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_fatherName);
      return false;
    }
    if (MathS.isNull(body.nationalId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_nationaId);
      return false;
    }
    if (!MathS.validateNationalId(body.nationalId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.incorrect_nationalId);
      return false;
    }
    if (MathS.isNull(body.mobiles)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_mobile);
      return false;
    }
    if (!MathS.validationMobiles(body.mobiles)) {
      this.utilsService.snackBarMessageWarn(EN_messages.invalid_mobileFormat);
      return false;
    }
    if (MathS.isNull(body.familyCount)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_familyCount);
      return false;
    }
    if (MathS.isNull(body.ownershipTypeId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_ownershipType);
      return false;
    }
    if (MathS.isNull(body.customerTypeId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insertـcustomerTypeId);
      return false;
    }
    return true;
  }
  requestDraftOther = (body: IRequestDraft): boolean => {
    if (MathS.isNull(body.domesticCount)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_domesticCount);
      return false;
    }
    if (MathS.isNull(body.commercialCount)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_commercialCount);
      return false;
    }
    if (MathS.isNull(body.otherCount)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_otherCount);
      return false;
    }
    if (MathS.isNull(body.domesticArea)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_domesticArea);
      return false;
    }
    if (MathS.isNull(body.commercialArea)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_commercialArea);
      return false;
    }
    if (MathS.isNull(body.otherArea)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_otherArea);
      return false;
    }
    if (MathS.isNullZero(body.domesticConstructionArea)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_domesticConstructionArea);
      return false;
    }
    if (MathS.isNullZero(body.commercialConstructionArea)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_commercialConstructionArea);
      return false;
    }
    if (MathS.isNullZero(body.otherConstructionArea)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_otherConstructionArea);
      return false;
    }
    return true;
  }
  requestDraftLocation = (body: IRequestDraft): boolean => {
    if (MathS.isNull(body.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
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
    if (MathS.isNull(body.address)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_address);
      return false;
    }
    if (!MathS.isLowerThanMinLength(body.address, ENRandomNumbers.ten)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_address);
      return false;
    }
    return true;
  }
  requestDraftTechnical = (body: IRequestDraft): boolean => {
    if (MathS.isNull(body.usageId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_usage);
      return false;
    }
    if (MathS.isNull(body.branchDiameterId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_Diameter);
      return false;
    }
    if (MathS.isNull(body.guildId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_guild);
      return false;
    }
    if (!MathS.isExactLengthYouNeed(body.watarInstallationJalaliDay, ENRandomNumbers.ten)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_isNotExactLengthEndTime);
      return false;
    }
    // if (!MathS.isExactLengthYouNeed(body.sewageInstallationJalaliDay, ENRandomNumbers.ten)) {
    //   this.utilsService.snackBarMessageWarn(EN_messages.format_isNotExactLengthEndTime);
    //   return false;
    // }
    if (MathS.isNull(body.branchStateId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insertـbranchStateId);
      return false;
    }
    if (MathS.isNull(body.siphonId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_siphon);
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
    if (MathS.isNull(body.capacity)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_capacity);
      return false;
    }

    return true;
  }
  requestDraftOffering = (body: IRequestDraft): boolean => {
    if (MathS.isNull(body.offeringGroupIds)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_offeringIds);
      return false;
    }
    return true;
  }
  requestDraftAdd = (body: IRequestDraft): boolean => {
    if (MathS.isNull(body.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNullZero(body.commercialConstructionArea)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_commercialConstructionArea);
      return false;
    }
    if (MathS.isNullZero(body.domesticConstructionArea)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_domesticConstructionArea);
      return false;
    }
    if (MathS.isNullZero(body.otherConstructionArea)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_otherConstructionArea);
      return false;
    }
    if (MathS.isNull(body.offeringGroupIds)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_offeringIds);
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
    if (MathS.isNull(body.usageId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_usage);
      return false;
    }
    if (MathS.isNull(body.branchDiameterId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_Diameter);
      return false;
    }
    if (MathS.isNull(body.siphonId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_siphon);
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
    if (!MathS.isLowerThanMinLength(body.address, ENRandomNumbers.ten)) {
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
    if (MathS.isNull(dataSource['zoneIds'])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zoneIds);
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
  private datesValidationGIS = (dataSource: IReadingReportGISReq): boolean => {
    if (dataSource.isSingleZone) {
      if (MathS.isNull(dataSource.zoneId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    }
    else {
      if (MathS.isNull(dataSource.zoneIds)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zoneIds);
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
  private datesValidation = (dataSource: object): boolean => {
    if (MathS.isNull(dataSource['zoneIds'])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zoneIds);
      return false;
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
    if (dataSource.hasOwnProperty('zoneIds'))
      if (MathS.isNull(dataSource['zoneIds'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zoneIds);
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
    if (readingReportGISReq.isSingleZone) {
      if (MathS.isNull(readingReportGISReq.zoneId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    }
    else {
      if (MathS.isNull(readingReportGISReq.zoneIds)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zoneIds);
        return false;
      }
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
      return this.datesValidationGIS(readingReportGISReq);
    }
    else {
      return this.periodValidationGIS(readingReportGISReq);
    }
  }
  verificationRRAnalyzePerformance = (readingReportReq: IMostReportInput, isValidateByDate: boolean): boolean => {
    return isValidateByDate ? (readingReportReq.readingPeriodId = null, this.datesValidation(readingReportReq)) : this.periodValidations(readingReportReq)
  }
  verificationEditOnRoleGroupAccess = (dataSource: any) => {
    if (MathS.isNull(dataSource)) {
      this.utilsService.snackBarMessage(EN_messages.insert_group_access, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }
  verificationEditOnRole = (dataSource: IUserEditOnRole) => {
    if (MathS.isNull(dataSource.selectedActions[0])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_work);
      return false;
    }
    return true;
  }
  checkUserAddInfos = (vals: IAddAUserManager) => {
    if (MathS.isNull(vals.userCode)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_karbaricode);
      return false;
    }
    if (MathS.isNull(vals.username)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_karbari);
      return false;
    }
    if (MathS.isNull(vals.password)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_password);
      return false;
    }
    if (MathS.isNull(vals.confirmPassword)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_confirm_pass);
      return false;
    }
    if (!MathS.isSameLength(vals.password, vals.confirmPassword)) {
      this.utilsService.snackBarMessageWarn(EN_messages.passwords_notFetch);
      return false;
    }
    if (!MathS.isExactEqual(vals.password, vals.confirmPassword)) {
      this.utilsService.snackBarMessageWarn(EN_messages.password_notExactly)
      return false;
    }
    if (MathS.isNull(vals.firstName)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_name);
      return false;
    }
    if (MathS.isNull(vals.sureName)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_surename);
      return false;
    }
    if (MathS.isNull(vals.mobile)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_mobile);
      return false;
    }
    if (!MathS.mobileValidation(vals.mobile)) {
      this.utilsService.snackBarMessageWarn(EN_messages.invalid_mobile);
      return false;
    }
    if (MathS.isNull(vals.displayName)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_showName);
      return false;
    }
    // if (!MathS.isNull(vals.email) && !MathS.isEmailValid(vals.email)) {
    //   this.utilsService.snackBarMessageWarn(EN_messages.invalid_email);
    //   return false;
    // }
    if (MathS.isNull(vals.selectedRoles[0])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_group_access);
      return false;
    }
    if (MathS.isNull(vals.selectedActions[0])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_work);
      return false;
    }
    if (MathS.isNull(vals.selectedZones[0])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_roleAccess);
      return false;
    }

    return true;
  }
  checkEmptyUserInfos = (dataSource: IAUserEditSave) => {
    if (MathS.isNull(dataSource.firstName)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_name);
      return false;
    }
    if (MathS.isNull(dataSource.sureName)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_surename);
      return false;
    }
    if (MathS.isNull(dataSource.mobile)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_mobile);
      return false;
    }
    if (MathS.isNull(dataSource.displayName)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_showName);
      return false;
    }
    if (MathS.isNull(dataSource.selectedRoles[0])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_group_access);
      return false;
    }
    if (MathS.isNull(dataSource.selectedActions[0])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_work);
      return false;
    }
    if (MathS.isNull(dataSource.selectedZones)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_roleAccess);
      return false;
    }

    return true;
  }
  userEditSave = (dataSource: IAUserEditSave) => {
    if (!this.checkEmptyUserInfos(dataSource)) {
      return false;
    }
    if (!MathS.mobileValidation(dataSource.mobile)) {
      this.utilsService.snackBarMessageWarn(EN_messages.invalid_mobile);
      return false;
    }
    // if (!MathS.isNull(dataSource.email))
    //   if (!MathS.isEmailValid(dataSource.email)) {
    //     this.utilsService.snackBarMessageWarn(EN_messages.invalid_email);
    //     return false;
    //   }

    return true;
  }
  checkVertiticationNotifDirectImage = (fileForm: FileList, val: INotifyDirectImage, ioPolicy: IIOPolicy): boolean => {
    const allowedExtension = ['image/jpeg', 'image/jpg', 'image/png'];
    const allowedNames = ['jpeg', 'jpg', 'png', 'JPEG', 'JPG', 'PNG'];

    if (MathS.isNull(val.caption)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_caption);
      return false;
    }
    if (MathS.isNull(fileForm)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_Image);
      return false;
    }
    if (allowedNames.indexOf(fileForm[0].name.split('.').pop().toLowerCase()) == -1) {
      this.utilsService.snackBarMessageWarn(EN_messages.should_insert_image);
      return false;
    }
    if (allowedExtension.indexOf(fileForm[0].type) == -1) {
      this.utilsService.snackBarMessage(EN_messages.insertIsNotImage, ENSnackBarColors.warn);
      return false;
    }
    if (fileForm[0].size / 1024 > ioPolicy.inputMaxSizeKb) {
      this.utilsService.snackBarMessage(EN_messages.uploadMaxCountPassed, ENSnackBarColors.warn);
      return false;
    }

    return true;
  }
  checkVertiticationNotifDirectVideo = (fileForm: FileList, val: INotifyDirectImage): boolean => {
    const allowedNames = ['mp4', 'MP4', 'ogg', 'OGG`'];
    if (MathS.isNull(val.caption)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_caption);
      return false;
    }
    if (MathS.isNull(fileForm)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_video);
      return false;
    }
    if (allowedNames.indexOf(fileForm[0].name.split('.').pop()) == -1) {
      this.utilsService.snackBarMessageWarn(EN_messages.should_insert_video);
      return false;
    }

    return true;
  }
  sectionsNullVertificate = (value: any): boolean => {
    if (value.hasOwnProperty('id')) {
      if (MathS.isNull(value.id)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_Id);
        return false;
      }
    }
    if (value.hasOwnProperty('title')) {
      if (MathS.isNull(value.title)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_title);
        return false;
      }
    }
    if (value.hasOwnProperty('days')) {
      if (MathS.isNull(value.days)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_days);
        return false;
      }
    }
    if (value.hasOwnProperty('provinceId')) {
      if (MathS.isNull(value.provinceId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_province);
        return false;
      }
    }
    if (value.hasOwnProperty('countryId')) {
      if (MathS.isNull(value.countryId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_country);
        return false;
      }
    }
    if (value.hasOwnProperty('regionId')) {
      if (MathS.isNull(value.regionId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_region);
        return false;
      }
    }
    if (value.hasOwnProperty('zoneId')) {
      if (MathS.isNull(value.zoneId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    }
    if (value.hasOwnProperty('logicalOrder')) {
      if (MathS.isNull(value.logicalOrder)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_logicalOrder);
        return false;
      }
    }
    if (value.hasOwnProperty('govermentalCode')) {
      if (MathS.isNull(value.govermentalCode)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_govermentalCode);
        return false;
      }
    }
    if (value.hasOwnProperty('host')) {
      if (MathS.isNull(value.host)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_host);
        return false;
      }
    }
    if (value.hasOwnProperty('dbUserName')) {
      if (MathS.isNull(value.dbUserName)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_dbUserName);
        return false;
      }
    }
    if (value.hasOwnProperty('dbPassword')) {
      if (MathS.isNull(value.dbPassword)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_dbPassword);
        return false;
      }
    }
    if (value.hasOwnProperty('dbInitialCatalog')) {
      if (MathS.isNull(value.dbInitialCatalog)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_dbInitialCatalog);
        return false;
      }
    }
    if (value.hasOwnProperty('fromEshterak')) {
      if (MathS.isNullZero(value.fromEshterak)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_fromEshterak);
        return false;
      }
    }
    if (value.hasOwnProperty('toEshterak')) {
      if (MathS.isNull(value.toEshterak)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_ToEshterak);
        return false;
      }
    }
    if (value.hasOwnProperty('fromPostalCode')) {
      if (MathS.isNull(value.fromPostalCode)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_fromPostalCode);
        return false;
      }
      if (!MathS.isExactLengthYouNeed(value.fromPostalCode, ENRandomNumbers.ten)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_fromPostalCode);
        return false;
      }
      if (!MathS.postalCodeValidation(value.fromPostalCode)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_fromPostalCode);
        return false;
      }
    }
    if (value.hasOwnProperty('toPostalCode')) {
      if (MathS.isNullZero(value.toPostalCode)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_toPostalCode);
        return false;
      }
      if (!MathS.isExactLengthYouNeed(value.toPostalCode, ENRandomNumbers.ten)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_toPostalCode);
        return false;
      }
      if (!MathS.postalCodeValidation(value.toPostalCode)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_toPostalCode);
        return false;
      }
    }

    if (value.hasOwnProperty('fromRadif')) {
      if (MathS.isNullZero(value.fromRadif)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_radif);
        return false;
      }
    }
    if (value.hasOwnProperty('toRadif')) {
      if (MathS.isNullZero(value.toRadif)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_radif);
        return false;
      }
    }
    // periods
    if (value.hasOwnProperty('moshtarakinId')) {
      if (MathS.isNull(value.moshtarakinId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_moshtarakinId);
        return false;
      }
    }
    if (value.hasOwnProperty('readingPeriodKindId')) {
      if (MathS.isNull(value.readingPeriodKindId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriodKind);
        return false;
      }
    }
    if (value.hasOwnProperty('clientOrder')) {
      if (MathS.isNull(value.clientOrder)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_clientOrder);
        return false;
      }
    }
    // 
    // formulas
    if (value.hasOwnProperty('karbariMoshtarakinCode')) {
      if (MathS.isNull(value.karbariMoshtarakinCode)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_karbariMoshtarakinCode);
        return false;
      }
    }
    if (value.hasOwnProperty('fromDate')) {
      if (MathS.isNull(value.fromDate)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
        return false;
      }
    }
    if (value.hasOwnProperty('toDate')) {
      if (MathS.isNull(value.toDate)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
        return false;
      }
    }
    if (value.hasOwnProperty('fromRate')) {
      if (MathS.isNull(value.fromRate)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_fromRate);
        return false;
      }
    }
    if (value.hasOwnProperty('toRate')) {
      if (MathS.isNull(value.toRate)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_toRate);
        return false;
      }
    }
    if (value.hasOwnProperty('abFormula')) {
      if (MathS.isNull(value.abFormula)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_abFormula);
        return false;
      }
    }
    if (value.hasOwnProperty('fazelabFormula')) {
      if (MathS.isNull(value.fazelabFormula)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_fazelabFormula);
        return false;
      }
    }
    if (value.hasOwnProperty('formula')) {
      if (MathS.isNull(value.formula)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_formula);
        return false;
      }
    }
    // users        
    if (value.hasOwnProperty('titleUnicode')) {
      if (MathS.isNull(value.titleUnicode)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_title);
        return false;
      }
    }
    //   // reading managers
    if (value.hasOwnProperty('itemTitle')) {
      if (MathS.isNull(value.itemTitle)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_title);
        return false;
      }
    }

    return true;
  }
  fromToValidation = (value: any): boolean => {
    // if (value.hasOwnProperty('toEshterak')) {
    //   const a = value;
    //   if (!MathS.lengthControl(a.fromEshterak, a.toEshterak, 5, 15)) {
    //     this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_esterak);
    //     return false;
    //   }
    // }
    // if (value.hasOwnProperty('fromDate')) {
    //   const a = value;
    //   if (!MathS.lengthControl(a.fromDate, a.fromDate, 9, 10)) {
    //     this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_fromDate);
    //     return false;
    //   }
    // }
    if (value.hasOwnProperty('toDate')) {
      const a = value;
      if (!MathS.lengthControl(a.toDate, a.toDate, 9, 10)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_toDate);
        return false;
      }
    }
    return true;
  }
  isFromLowerThanTo = (value: any): boolean => {
    if (value.hasOwnProperty('toEshterak')) {
      const a = value;
      if (!MathS.isFromLowerThanTo(a.fromEshterak, a.toEshterak)) {
        this.utilsService.snackBarMessageWarn(EN_messages.lessThan_eshterak);
        return false;
      }
    }
    if (value.hasOwnProperty('toRate')) {
      const a = value;
      if (!MathS.isFromLowerThanTo(a.fromRate, a.toRate)) {
        this.utilsService.snackBarMessageWarn(EN_messages.lessThan_rate);
        return false;
      }
    }
    return true;
  }
  private NANValidation = (sth: string, message?: string): boolean => {
    if (MathS.isNaN(sth)) {
      if (message)
        this.utilsService.snackBarMessageWarn(message);
      return false;
    }
    return true;
  }

  textOutput = (value: any): boolean => {
    if (value.hasOwnProperty('endIndex')) {
      if (MathS.isNaN(value.endIndex)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_numberLengths);
        return false;
      }
    }
    if (value.hasOwnProperty('startIndex')) {
      if (MathS.isNaN(value.startIndex)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_numberLengths);
        return false;
      }
    }
    if (value.hasOwnProperty('length')) {
      if (MathS.isNaN(value['length'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_numberLengths);
        return false;
      }
    }
    if (value.hasOwnProperty('fromEshterak')) {
      if (MathS.isNaN(value['fromEshterak'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_numberLengths);
        return false;
      }
    }
    if (value.hasOwnProperty('toEshterak')) {
      if (MathS.isNaN(value['toEshterak'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_numberLengths);
        return false;
      }
    }
    return true;
  }
  sectionVertification(value: any): boolean {
    if (!this.sectionsNullVertificate(value))
      return false;
    if (!this.fromToValidation(value))
      return false;
    if (!this.isFromLowerThanTo(value))
      return false;

    return true;
  }
  masterValidation = (body: IFragmentMaster): boolean => {
    if (MathS.isNull(body.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNull(body.fromEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_fromEshterak);
      return false;
    }
    if (MathS.isNull(body.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_ToEshterak);
      return false;
    }
    if (MathS.isNull(body.routeTitle)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_title_route);
      return false;
    }
    if (!this.NANValidation(body.fromEshterak, EN_messages.format_invalid_from_eshterak))
      return false;
    if (!this.NANValidation(body.fromEshterak, EN_messages.format_invalid_to_eshterak))
      return false;

    if (!MathS.isSameLength(body.fromEshterak, body.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.sameLength_eshterak);
      return false;
    }

    if (!MathS.isFromLowerThanToByString(body.fromEshterak, body.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.lessThan_eshterak);
      return false;
    }

    if (!MathS.lengthControl(body.fromEshterak, body.toEshterak, 5, 15)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_esterak);
      return false;
    }

    return true;
  }
  private nullValidation = (sth: string | number, message?: string): boolean => {
    if (MathS.isNull(sth)) {
      if (message)
        this.utilsService.snackBarMessageWarn(message);
      return false;
    }
    return true;
  }
  ValidationMasterNoMessage = (fragmentMaster: IFragmentMaster): boolean => {
    if (!this.nullValidation(fragmentMaster.zoneId))
      return false;
    if (!this.nullValidation(fragmentMaster.fromEshterak))
      return false;
    if (!this.nullValidation(fragmentMaster.toEshterak))
      return false;
    if (!this.nullValidation(fragmentMaster.routeTitle))
      return false;

    if (!this.NANValidation(fragmentMaster.fromEshterak))
      return false;
    if (!this.NANValidation(fragmentMaster.fromEshterak))
      return false;

    if (!MathS.isSameLength(fragmentMaster.fromEshterak, fragmentMaster.toEshterak)) {
      return false;
    }

    if (!MathS.isFromLowerThanToByString(fragmentMaster.fromEshterak, fragmentMaster.toEshterak)) {
      return false;
    }

    if (!MathS.lengthControl(fragmentMaster.fromEshterak, fragmentMaster.toEshterak, 5, 15)) {
      return false;
    }
    return true;
  }
  ValidationDetailsNoMessage = (fragmentDetails: IFragmentDetails): boolean => {
    if (!this.nullValidation(fragmentDetails.fragmentMasterId))
      return false;
    if (!this.nullValidation(fragmentDetails.fromEshterak))
      return false;
    if (!this.nullValidation(fragmentDetails.toEshterak))
      return false;
    if (!this.nullValidation(fragmentDetails.routeTitle))
      return false;

    if (!this.NANValidation(fragmentDetails.fromEshterak))
      return false;
    if (!this.NANValidation(fragmentDetails.toEshterak))
      return false;

    if (!MathS.isFromLowerThanToByString(fragmentDetails.fromEshterak, fragmentDetails.toEshterak))
      return false;
    if (!MathS.isSameLength(fragmentDetails.fromEshterak, fragmentDetails.toEshterak))
      return false;
    if (!MathS.lengthControl(fragmentDetails.fromEshterak, fragmentDetails.toEshterak, 5, 15))
      return false;
    return true;
  }
  verificationAutoImportAdd = (body: IAutomaticImportAddEdit): boolean => {
    if (MathS.isNull(body.startDay)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_startDay);
      return false;
    }
    if (MathS.isNull(body.endDay)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_endDay);
      return false;
    }
    if (MathS.isNull(body.startTime)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_startTime);
      return false;
    }
    if (!MathS.isExactLengthYouNeed(body.startTime, ENRandomNumbers.five)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_isNotExactLengthEndTime);
      return false;
    }
    if (!MathS.isExactLengthYouNeed(body.startDay, ENRandomNumbers.ten)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_isNotExactLengthNumber);
      return false;
    }
    if (!MathS.isExactLengthYouNeed(body.endDay, ENRandomNumbers.ten)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_isNotExactLengthNumber);
      return false;
    }
    if (MathS.isNull(body.readingPeriodKindId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriodKind);
      return false;
    }
    if (!MathS.persentCheck(body.alalHesabPercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.percent_alalhesab);
      return false;
    }
    if (!MathS.persentCheck(body.imagePercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.percent_pictures);
      return false;
    }
    if (MathS.isNaN(body.alalHesabPercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_alalhesab);
      return false;
    }
    if (MathS.isNaN(body.imagePercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_imagePercent);
      return false;
    }
    return true;
  }
  verificationDetails = (fragmentDetails: IFragmentDetails): boolean => {
    if (!this.nullValidation(fragmentDetails.fragmentMasterId, EN_messages.call_supportGroup))
      return false;
    if (!this.nullValidation(fragmentDetails.fromEshterak, EN_messages.insert_fromEshterak))
      return false;
    if (!this.nullValidation(fragmentDetails.toEshterak, EN_messages.insert_ToEshterak))
      return false;
    if (!this.nullValidation(fragmentDetails.routeTitle, EN_messages.insert_title_route))
      return false;

    if (!this.NANValidation(fragmentDetails.fromEshterak, EN_messages.format_invalid_from_eshterak))
      return false;

    if (!this.NANValidation(fragmentDetails.toEshterak, EN_messages.format_invalid_to_eshterak))
      return false;
    if (!MathS.isFromLowerThanToByString(fragmentDetails.fromEshterak, fragmentDetails.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.lessThan_eshterak);
      return false;
    }

    if (!MathS.isSameLength(fragmentDetails.fromEshterak, fragmentDetails.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.sameLength_eshterak);
      return false;
    }

    if (!MathS.lengthControl(fragmentDetails.fromEshterak, fragmentDetails.toEshterak, 5, 15)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_esterak);
      return false;
    }

    return true;
  }
  tarriffManager = (item: ITariffExcelToFillInput): boolean => {
    // if (!this.nullValidation(item., EN_messages.insert_title))
    //   return false;
    // if (!this.nullValidation(item.tariffTypeId, EN_messages.insert_fromEshterak))
    //   return false;
    // if (!this.nullValidation(item.tariffCalculationMode, EN_messages.insert_ToEshterak))
    //   return false;

    return true;
  }
  tarrifTypeItem = (item: ITarrifTypeItem): boolean => {
    if (!this.nullValidation(item.title, EN_messages.insert_title))
      return false;
    if (!this.nullValidation(item.tariffTypeId, EN_messages.insert_tariffType))
      return false;
    if (!this.nullValidation(item.tariffCalculationMode, EN_messages.insert_tariffCalculationMode))
      return false;

    return true;
  }
  tarrifManager = (item: ITariffAll): boolean => {
    if (item.isEditing) {
      if (!this.nullValidation(item.id, EN_messages.call_supportGroup))
        return false;
    }
    if (!this.nullValidation(item.zoneId, EN_messages.insert_zone))
      return false;
    if (!this.nullValidation(item.usageId, EN_messages.insert_usage))
      return false;
    if (MathS.isNullZero(item.fromRate)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_fromRate);
      return false;
    }
    if (!this.nullValidation(item.toRate, EN_messages.insert_toRate))
      return false;
    if (!this.nullValidation(item.offeringId, EN_messages.insert_offeringId))
      return false;
    if (MathS.isNullZero(item.calulcationOrder)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_calculationOrder);
      return false;
    }
    if (MathS.isNullZero(item.tarrifTypeItemId)) {// tarrifTypeItemId could be null
      this.utilsService.snackBarMessageWarn(EN_messages.insert_tariffType);
      return false;
    }

    return true;
  }
  offeringUnit = (item: IOfferingUnit): boolean => {
    if (!this.nullValidation(item.title, EN_messages.insert_title))
      return false;

    return true;
  }
  scheduledPaymentMethod = (item: IScheduledPaymentMethod): boolean => {
    if (!this.nullValidation(item.title, EN_messages.insert_title))
      return false;

    return true;
  }
  bank = (item: IBank): boolean => {
    if (!this.nullValidation(item.title, EN_messages.insert_title))
      return false;
    if (!this.nullValidation(item.code, EN_messages.insert_bankCode))
      return false;

    return true;
  }
  tariffType = (item: ITariffType): boolean => {
    if (!this.nullValidation(item.title, EN_messages.insert_title))
      return false;

    return true;
  }
  village = (item: IVillage): boolean => {
    if (!this.nullValidation(item.zoneId, EN_messages.insert_zone))
      return false;
    if (!this.nullValidation(item.title, EN_messages.insert_title))
      return false;
    if (!this.nullValidation(item.logicalOrder, EN_messages.insert_logicalOrder))
      return false;

    return true;
  }
  offeringGroup = (item: IOfferingGroup): boolean => {
    if (!this.nullValidation(item.title, EN_messages.insert_title))
      return false;

    return true;
  }
  invoiceType = (item: IInvoiceType): boolean => {
    if (!this.nullValidation(item.title, EN_messages.insert_title))
      return false;

    return true;
  }
  offering = (item: IOffering): boolean => {
    if (!this.nullValidation(item.title, EN_messages.insert_title))
      return false;
    if (!this.nullValidation(item.offeringUnitId, EN_messages.insert_offeringUnitId))
      return false;

    return true;
  }
  tarrifParameter = (item: ITarrifParameter): boolean => {
    if (!this.nullValidation(item.title, EN_messages.insert_title))
      return false;
    if (!this.nullValidation(item.tag, EN_messages.insert_tag))
      return false;

    return true;
  }
  flowState = (item: IFlowState): boolean => {
    if (!this.nullValidation(item.title, EN_messages.insert_title))
      return false;

    return true;
  }
  flowRule = (item: IFlowRule): boolean => {
    // if (!this.nullValidation(item.fromFlowStateId, EN_messages.))
    //   return false;
    // if (!this.nullValidation(item.toFlowStateId, EN_messages.))
    //   return false;
    if (!this.nullValidation(item.offeringGroupId, EN_messages.insert_offeringIds))
      return false;

    return true;
  }
  flowRuleReq = (item: any): boolean => {
    if (!this.nullValidation(item.offeringGroupId, EN_messages.insert_offeringIds))
      return false;

    return true;
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
  verificationTimes = (dataSource: object): boolean => {
    if (MathS.isNull(dataSource['fromTime'])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_startTime);
      return false;
    }
    if (MathS.isNull(dataSource['toTime'])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_endTime);
      return false;
    }
    if (!MathS.isExactLengthYouNeed(dataSource['fromTime'], ENRandomNumbers.five)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_isNotExactLengthEndTime);
      return false;
    }
    if (!MathS.isExactLengthYouNeed(dataSource['toTime'], ENRandomNumbers.five)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_isNotExactLengthEndTime);
      return false;
    }

    return true;
  }
  verificationDates = (dataSource: object): boolean => {
    if (dataSource.hasOwnProperty('fromDate')) {
      if (MathS.isNull(dataSource['fromDate'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('toDate')) {
      if (MathS.isNull(dataSource['toDate'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('fromDate')) {
      if (!MathS.lengthControl(dataSource['fromDate'], dataSource['fromDate'], 9, 10)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_fromDate);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('toDate')) {
      if (!MathS.lengthControl(dataSource['toDate'], dataSource['toDate'], 9, 10)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_toDate);
        return false;
      }
    }
    return true;
  }
  verificationPolicy = (dataSource: IPolicies): boolean => {
    if (MathS.isNull(dataSource.deactiveTerminationMinutes)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_deactiveTerminationMinutes);
      return false;
    }
    if (MathS.isNull(dataSource.maxLogRecords)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_maxLogRecords);
      return false;
    }
    return true;
  }
  verificationIOPolicyAdd = (dataSource: IIOPolicy): boolean => {
    if (MathS.isNull(dataSource.inputExtensions)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_inputExtensions);
      return false;
    }
    if (MathS.isNull(dataSource.contentType)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_contentType);
      return false;
    }
    if (MathS.isNull(dataSource.inputMaxCountPerDay) || MathS.isNaN(dataSource.inputMaxCountPerDay)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalidOrWrong);
      return false;
    }
    if (MathS.isNull(dataSource.inputMaxCountPerUser) || MathS.isNaN(dataSource.inputMaxCountPerUser)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalidOrWrong);
      return false;
    }
    if (MathS.isNull(dataSource.outputMaxCountPerDay) || MathS.isNaN(dataSource.outputMaxCountPerDay)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalidOrWrong);
      return false;
    }
    if (MathS.isNull(dataSource.outputMaxCountPerUser) || MathS.isNaN(dataSource.outputMaxCountPerUser)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalidOrWrong);
      return false;
    }
    if (MathS.isNull(dataSource.inputMaxSizeKb) || MathS.isNaN(dataSource.inputMaxSizeKb)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalidOrWrong);
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
  verificationFollowUPTrackNumber = (id: number): boolean => {
    return this.followUPValidation(id);
  }

}
