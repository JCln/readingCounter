import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EN_messages } from 'interfaces/enums.enum';
import { UtilsService } from 'services/utils.service';

import { MathS } from '../classes/math-s';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {
  private dynamicValue: any;
  private form = new FormGroup({});

  constructor(
    private utilsService: UtilsService
  ) { }

  private sectionsNullVertificate = (): boolean => {
    if (this.dynamicValue.hasOwnProperty('id')) {
      if (MathS.isNull(this.dynamicValue.id)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_Id);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('title')) {
      if (MathS.isNull(this.dynamicValue.title)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_title);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('days')) {
      if (MathS.isNull(this.dynamicValue.days)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_days);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('provinceId')) {
      if (MathS.isNull(this.dynamicValue.provinceId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_province);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('countryId')) {
      if (MathS.isNull(this.dynamicValue.countryId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_country);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('regionId')) {
      if (MathS.isNull(this.dynamicValue.regionId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_region);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('zoneId')) {
      if (MathS.isNull(this.dynamicValue.zoneId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('logicalOrder')) {
      if (MathS.isNull(this.dynamicValue.logicalOrder)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_logicalOrder);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('govermentalCode')) {
      if (MathS.isNull(this.dynamicValue.govermentalCode)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_govermentalCode);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('fromEshterak')) {
      if (MathS.isNull(this.dynamicValue.fromEshterak)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_fromEshterak);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('toEshterak')) {
      if (MathS.isNull(this.dynamicValue.toEshterak)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_ToEshterak);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('fromRadif')) {
      if (MathS.isNull(this.dynamicValue.fromRadif)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_radif);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('toRadif')) {
      if (MathS.isNull(this.dynamicValue.toRadif)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_radif);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('host')) {
      if (MathS.isNull(this.dynamicValue.host)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_host);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('dbUserName')) {
      if (MathS.isNull(this.dynamicValue.dbUserName)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_userName);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('dbPassword')) {
      if (MathS.isNull(this.dynamicValue.dbPassword)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_password);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('dbInitialCatalog')) {
      if (MathS.isNull(this.dynamicValue.dbInitialCatalog)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_catalog);
        return false;
      }
    }
    // periods
    if (this.dynamicValue.hasOwnProperty('moshtarakinId')) {
      if (MathS.isNull(this.dynamicValue.moshtarakinId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_moshtarakinId);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('readingPeriodKindId')) {
      if (MathS.isNull(this.dynamicValue.readingPeriodKindId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriodKind);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('clientOrder')) {
      if (MathS.isNull(this.dynamicValue.clientOrder)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_clientOrder);
        return false;
      }
    }
    // 
    // formulas
    if (this.dynamicValue.hasOwnProperty('karbariMoshtarakinCode')) {
      if (MathS.isNull(this.dynamicValue.karbariMoshtarakinCode)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_karbariMoshtarakinCode);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('fromDate')) {
      if (MathS.isNull(this.dynamicValue.fromDate)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('toDate')) {
      if (MathS.isNull(this.dynamicValue.toDate)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('fromRate')) {
      if (MathS.isNull(this.dynamicValue.fromRate)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_fromRate);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('toRate')) {
      if (MathS.isNull(this.dynamicValue.toRate)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_toRate);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('abFormula')) {
      if (MathS.isNull(this.dynamicValue.abFormula)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_abFormula);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('fazelabFormula')) {
      if (MathS.isNull(this.dynamicValue.fazelabFormula)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_fazelabFormula);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('formula')) {
      if (MathS.isNull(this.dynamicValue.formula)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_formula);
        return false;
      }
    }
    // users        
    if (this.dynamicValue.hasOwnProperty('titleUnicode')) {
      if (MathS.isNull(this.dynamicValue.titleUnicode)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_title);
        return false;
      }
    }
    //   // reading managers
    if (this.dynamicValue.hasOwnProperty('itemTitle')) {
      if (MathS.isNull(this.dynamicValue.itemTitle)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_title);
        return false;
      }
    }

    return true;
  }
  private fromToValidation = (): boolean => {
    if (this.dynamicValue.hasOwnProperty('toEshterak')) {
      const a = this.dynamicValue;
      if (!MathS.lengthControl(a.fromEshterak, a.toEshterak, 5, 15)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_esterak);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('fromDate')) {
      const a = this.dynamicValue;
      if (!MathS.lengthControl(a.fromDate, a.fromDate, 9, 10)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_fromDate);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('toDate')) {
      const a = this.dynamicValue;
      if (!MathS.lengthControl(a.toDate, a.toDate, 9, 10)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_toDate);
        return false;
      }
    }
    return true;
  }
  private isFromLowerThanTo = (): boolean => {
    if (this.dynamicValue.hasOwnProperty('toEshterak')) {
      const a = this.dynamicValue;
      if (!MathS.isFromLowerThanTo(a.fromEshterak, a.toEshterak)) {
        this.utilsService.snackBarMessageWarn(EN_messages.lessThan_eshterak);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('toRate')) {
      const a = this.dynamicValue;
      console.log(MathS.isFromLowerThanTo(a.fromRate, a.toRate));

      if (!MathS.isFromLowerThanTo(a.fromRate, a.toRate)) {
        this.utilsService.snackBarMessageWarn(EN_messages.lessThan_rate);
        return false;
      }
    }
    return true;
  }
  private validationIsNaN = (): boolean => {
    console.log(this.dynamicValue);
    console.log(this.dynamicValue.endIndex);

    if (this.dynamicValue.hasOwnProperty('endIndex')) {
      if (MathS.isNaN(this.dynamicValue.endIndex))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('startIndex')) {
      if (MathS.isNaN(this.dynamicValue.startIndex))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('length')) {
      if (MathS.isNaN(this.dynamicValue['length']))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('fromEshterak')) {
      if (MathS.isNaN(this.dynamicValue['fromEshterak']))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('toEshterak')) {
      if (MathS.isNaN(this.dynamicValue['toEshterak']))
        return false;
    }
    return true;
  }
  verfificationIsNaN = (): boolean => {
    if (!this.validationIsNaN()) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_numberLengths)
      return false;
    }
    return true;
  }
  sectionVertification(): boolean {
    if (!this.sectionsNullVertificate())
      return false;
    if (!this.fromToValidation())
      return false;
    if (!this.isFromLowerThanTo())
      return false;

    return true;
  }

  setSectionsValue(v: any) {
    if (this.dynamicValue)
      this.dynamicValue = null;
    this.dynamicValue = v;
  }
  setNewForm = (v: any) => {
    this.form[v] = new FormControl('');
  }

}