import { Injectable } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {
  private dynamicValue: any;

  constructor(
    private utilsService: UtilsService
  ) { }

  private sectionsNullVertificate = (): boolean => {
    if (this.utilsService.isNull(this.dynamicValue.id))
      return false;
    if (this.utilsService.isNull(this.dynamicValue.title))
      return false;
    if (this.dynamicValue.hasOwnProperty('provinceId')) {
      if (this.utilsService.isNull(this.dynamicValue.provinceId))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('countryId')) {
      if (this.utilsService.isNull(this.dynamicValue.countryId))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('regionId')) {
      if (this.utilsService.isNull(this.dynamicValue.regionId))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('zoneId')) {
      if (this.utilsService.isNull(this.dynamicValue.zoneId))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('logicalOrder')) {
      if (this.utilsService.isNull(this.dynamicValue.logicalOrder))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('govermentalCode')) {
      if (this.utilsService.isNull(this.dynamicValue.govermentalCode))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('fromEshterak')) {
      if (this.utilsService.isNull(this.dynamicValue.fromEshterak))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('toEshterak')) {
      if (this.utilsService.isNull(this.dynamicValue.toEshterak))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('fromRadif')) {
      if (this.utilsService.isNull(this.dynamicValue.fromRadif))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('toRadif')) {
      if (this.utilsService.isNull(this.dynamicValue.toRadif))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('host')) {
      if (this.utilsService.isNull(this.dynamicValue.host))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('dbUserName')) {
      if (this.utilsService.isNull(this.dynamicValue.dbUserName))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('dbPassword')) {
      if (this.utilsService.isNull(this.dynamicValue.dbPassword))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('dbInitialCatalog')) {
      if (this.utilsService.isNull(this.dynamicValue.dbInitialCatalog))
        return false;
    }
    // auth level parts
    if (this.dynamicValue.hasOwnProperty('cssClass')) {
      if (this.utilsService.isNull(this.dynamicValue.cssClass))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('authLevel3Id')) {
      if (this.utilsService.isNull(this.dynamicValue.authLevel3Id))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('value')) {
      if (this.utilsService.isNull(this.dynamicValue.value))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('authLevel1Id')) {
      if (this.utilsService.isNull(this.dynamicValue.authLevel1Id))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('authLevel2Id')) {
      if (this.utilsService.isNull(this.dynamicValue.authLevel2Id))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('route')) {
      if (this.utilsService.isNull(this.dynamicValue.route))
        return false;
    }
    // 
    // periods
    if (this.dynamicValue.hasOwnProperty('moshtarakinId')) {
      if (this.utilsService.isNull(this.dynamicValue.moshtarakinId))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('readingPeriodKindId')) {
      if (this.utilsService.isNull(this.dynamicValue.readingPeriodKindId))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('clientOrder')) {
      if (this.utilsService.isNull(this.dynamicValue.clientOrder))
        return false;
    }
    // 
    return true;
  }
  private fromToValidation = (): boolean => {
    if (this.dynamicValue.hasOwnProperty('toEshterak')) {
      const a = this.dynamicValue;
      if (this.utilsService.lengthControl(a.fromEshterak, a.toEshterak, 5, 15)) {
        this.utilsService.snackBarMessageWarn('فرمت اشتراک ناصحیح است');
        return false;
      }
    }
    return true;
  }
  private isFromLowerThanTo = (): boolean => {
    if (this.dynamicValue.hasOwnProperty('toEshterak')) {
      const a = this.dynamicValue;
      if (this.utilsService.isFromLowerThanTo(a.fromEshterak, a.toEshterak)) {
        this.utilsService.snackBarMessageWarn('از اشتراک کمتر از تا اشتراک است!');
        return false;
      }
    }
    return true;
  }
  sectionVertification(): boolean {
    if (!this.sectionsNullVertificate()) {
      this.utilsService.snackBarMessageWarn('مقادیر نمیتواند خالی باشند');
      return false;
    }
    if (!this.fromToValidation())
      return false;
    if (!this.isFromLowerThanTo())
      return false;
    return true;
  }

  setSectionsValue(v: any) {
    this.dynamicValue = v;
  }

}