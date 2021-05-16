import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';

import { EN_messages } from '../Interfaces/enums.enum';

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
      if (this.utilsService.isNull(this.dynamicValue.id))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('title')) {
      if (this.utilsService.isNull(this.dynamicValue.title))
        return false;
    }
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
    // formulas
    if (this.dynamicValue.hasOwnProperty('karbariMoshtarakinCode')) {
      if (this.utilsService.isNull(this.dynamicValue.karbariMoshtarakinCode))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('fromDate')) {
      if (this.utilsService.isNull(this.dynamicValue.fromDate))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('toDate')) {
      if (this.utilsService.isNull(this.dynamicValue.toDate))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('fromRate')) {
      if (this.utilsService.isNull(this.dynamicValue.fromRate))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('toRate')) {
      if (this.utilsService.isNull(this.dynamicValue.toRate))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('abFormula')) {
      if (this.utilsService.isNull(this.dynamicValue.abFormula))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('fazelabFormula')) {
      if (this.utilsService.isNull(this.dynamicValue.fazelabFormula))
        return false;
    }
    if (this.dynamicValue.hasOwnProperty('formula')) {
      if (this.utilsService.isNull(this.dynamicValue.formula))
        return false;
    }

    // 
    return true;
  }
  private fromToValidation = (): boolean => {
    if (this.dynamicValue.hasOwnProperty('toEshterak')) {
      const a = this.dynamicValue;
      if (this.utilsService.lengthControl(a.fromEshterak, a.toEshterak, 5, 15)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_esterak);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('toDate')) {
      const a = this.dynamicValue;
      if (this.utilsService.lengthControl(a.toDate, a.toDate, 9, 10)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_date);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('fromDate')) {
      const a = this.dynamicValue;
      if (this.utilsService.lengthControl(a.fromDate, a.fromDate, 9, 10)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_date);
        return false;
      }
    }
    return true;
  }
  private isFromLowerThanTo = (): boolean => {
    if (this.dynamicValue.hasOwnProperty('toEshterak')) {
      const a = this.dynamicValue;
      if (this.utilsService.isFromLowerThanTo(a.fromEshterak, a.toEshterak)) {
        this.utilsService.snackBarMessageWarn(EN_messages.lessThan_eshterak);
        return false;
      }
    }
    if (this.dynamicValue.hasOwnProperty('toRate')) {
      const a = this.dynamicValue;
      if (this.utilsService.isFromLowerThanTo(a.fromRate, a.toRate)) {
        this.utilsService.snackBarMessageWarn(EN_messages.lessThan_rate);
        return false;
      }
    }
    return true;
  }
  sectionVertification(): boolean {
    if (!this.sectionsNullVertificate()) {
      this.utilsService.snackBarMessageWarn(EN_messages.allowed_empty);
      return false;
    }
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
  createFormGroup = (): FormGroup => {
    if (this.dynamicValue.hasOwnProperty('id')) {
      if (!this.utilsService.isNull(this.dynamicValue.id))
        this.setNewForm(this.dynamicValue.id);
    }
    if (this.dynamicValue.hasOwnProperty('title')) {
      if (!this.utilsService.isNull(this.dynamicValue.title))
        this.setNewForm(this.dynamicValue.title);
    }
    if (this.dynamicValue.hasOwnProperty('provinceId')) {
      if (!this.utilsService.isNull(this.dynamicValue.provinceId))
        this.setNewForm(this.dynamicValue.provinceId);
    }
    if (this.dynamicValue.hasOwnProperty('countryId')) {
      if (!this.utilsService.isNull(this.dynamicValue.countryId))
        this.setNewForm(this.dynamicValue.countryId);
    }
    if (this.dynamicValue.hasOwnProperty('regionId')) {
      if (!this.utilsService.isNull(this.dynamicValue.regionId))
        this.setNewForm(this.dynamicValue.regionId);
    }
    if (this.dynamicValue.hasOwnProperty('zoneId')) {
      if (!this.utilsService.isNull(this.dynamicValue.zoneId))
        this.setNewForm(this.dynamicValue.zoneId);
    }
    if (this.dynamicValue.hasOwnProperty('logicalOrder')) {
      if (!this.utilsService.isNull(this.dynamicValue.logicalOrder))
        this.setNewForm(this.dynamicValue.logicalOrder);
    }
    if (this.dynamicValue.hasOwnProperty('govermentalCode')) {
      if (!this.utilsService.isNull(this.dynamicValue.govermentalCode))
        this.setNewForm(this.dynamicValue.govermentalCode);
    }
    if (this.dynamicValue.hasOwnProperty('fromEshterak')) {
      if (!this.utilsService.isNull(this.dynamicValue.fromEshterak))
        this.setNewForm(this.dynamicValue.fromEshterak);
    }
    if (this.dynamicValue.hasOwnProperty('toEshterak')) {
      if (!this.utilsService.isNull(this.dynamicValue.toEshterak))
        this.setNewForm(this.dynamicValue.toEshterak);
    }
    if (this.dynamicValue.hasOwnProperty('fromRadif')) {
      if (!this.utilsService.isNull(this.dynamicValue.fromRadif))
        this.setNewForm(this.dynamicValue.fromRadif);
    }
    if (this.dynamicValue.hasOwnProperty('toRadif')) {
      if (!this.utilsService.isNull(this.dynamicValue.toRadif))
        this.setNewForm(this.dynamicValue.toRadif);
    }
    if (this.dynamicValue.hasOwnProperty('host')) {
      if (!this.utilsService.isNull(this.dynamicValue.host))
        this.setNewForm(this.dynamicValue.host);
    }
    if (this.dynamicValue.hasOwnProperty('dbUserName')) {
      if (!this.utilsService.isNull(this.dynamicValue.dbUserName))
        this.setNewForm(this.dynamicValue.dbUserName);
    }
    if (this.dynamicValue.hasOwnProperty('dbPassword')) {
      if (!this.utilsService.isNull(this.dynamicValue.dbPassword))
        this.setNewForm(this.dynamicValue.dbPassword);
    }
    if (this.dynamicValue.hasOwnProperty('dbInitialCatalog')) {
      if (!this.utilsService.isNull(this.dynamicValue.dbInitialCatalog))
        this.setNewForm(this.dynamicValue.dbInitialCatalog);
    }
    // auth level parts
    if (this.dynamicValue.hasOwnProperty('cssClass')) {
      if (!this.utilsService.isNull(this.dynamicValue.cssClass))
        this.setNewForm(this.dynamicValue.cssClass);
    }
    if (this.dynamicValue.hasOwnProperty('authLevel3Id')) {
      if (!this.utilsService.isNull(this.dynamicValue.authLevel3Id))
        this.setNewForm(this.dynamicValue.authLevel3Id);
    }
    if (this.dynamicValue.hasOwnProperty('value')) {
      if (!this.utilsService.isNull(this.dynamicValue.value))
        this.setNewForm(this.dynamicValue.value);
    }
    if (this.dynamicValue.hasOwnProperty('authLevel1Id')) {
      if (!this.utilsService.isNull(this.dynamicValue.authLevel1Id))
        this.setNewForm(this.dynamicValue.authLevel1Id);
    }
    if (this.dynamicValue.hasOwnProperty('authLevel2Id')) {
      if (!this.utilsService.isNull(this.dynamicValue.authLevel2Id))
        this.setNewForm(this.dynamicValue.authLevel2Id);
    }
    if (this.dynamicValue.hasOwnProperty('route')) {
      if (!this.utilsService.isNull(this.dynamicValue.route))
        this.setNewForm(this.dynamicValue.route);
    }
    // 
    // periods
    if (this.dynamicValue.hasOwnProperty('moshtarakinId')) {
      if (!this.utilsService.isNull(this.dynamicValue.moshtarakinId))
        this.setNewForm(this.dynamicValue.moshtarakinId);
    }
    if (this.dynamicValue.hasOwnProperty('readingPeriodKindId')) {
      if (!this.utilsService.isNull(this.dynamicValue.readingPeriodKindId))
        this.setNewForm(this.dynamicValue.readingPeriodKindId);
    }
    if (this.dynamicValue.hasOwnProperty('clientOrder')) {
      if (!this.utilsService.isNull(this.dynamicValue.clientOrder))
        this.setNewForm(this.dynamicValue.clientOrder);
    }
    // 
    // formulas
    if (this.dynamicValue.hasOwnProperty('karbariMoshtarakinCode')) {
      if (!this.utilsService.isNull(this.dynamicValue.karbariMoshtarakinCode))
        this.setNewForm(this.dynamicValue.karbariMoshtarakinCode);
    }
    if (this.dynamicValue.hasOwnProperty('fromDate')) {
      if (!this.utilsService.isNull(this.dynamicValue.fromDate))
        this.setNewForm(this.dynamicValue.fromDate);
    }
    if (this.dynamicValue.hasOwnProperty('toDate')) {
      if (!this.utilsService.isNull(this.dynamicValue.toDate))
        this.setNewForm(this.dynamicValue.toDate);
    }
    if (this.dynamicValue.hasOwnProperty('fromRate')) {
      if (!this.utilsService.isNull(this.dynamicValue.fromRate))
        this.setNewForm(this.dynamicValue.fromRate);
    }
    if (this.dynamicValue.hasOwnProperty('toRate')) {
      if (!this.utilsService.isNull(this.dynamicValue.toRate))
        this.setNewForm(this.dynamicValue.toRate);
    }
    if (this.dynamicValue.hasOwnProperty('abFormula')) {
      if (!this.utilsService.isNull(this.dynamicValue.abFormula))
        this.setNewForm(this.dynamicValue.abFormula);
    }
    if (this.dynamicValue.hasOwnProperty('fazelabFormula')) {
      if (!this.utilsService.isNull(this.dynamicValue.fazelabFormula))
        this.setNewForm(this.dynamicValue.fazelabFormula);
    }

    // 
    return this.form.value;
  }


}