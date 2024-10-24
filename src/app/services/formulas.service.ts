import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { UtilsService } from 'services/utils.service';
import { MathS } from '../classes/math-s';
import { IAbBahaFormula, ITabsare2Formula } from '../interfaces/ireads-manager';
import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { OutputManagerService } from './output-manager.service';

@Injectable({
  providedIn: 'root'
})
export class FormulasService {
  private fileForm: FileList;
  private desc: any;

  constructor(
    public ajaxReqWrapperService: AjaxReqWrapperService,
    public dictionaryWrapperService: DictionaryWrapperService,
    private utilsService: UtilsService,
    public outputManagerService: OutputManagerService
  ) { }

  /* API CALLS */
  postFormulaEdit = async (method: ENInterfaces, body: object): Promise<any> => {
    const res = await this.ajaxReqWrapperService.postDataSourceByObject(method, body);
    this.utilsService.snackBarMessageSuccess(res.message);
    return res;
  }
  postFormulaAdd = async (method: ENInterfaces, dataSource: object) => {
    const res = await this.ajaxReqWrapperService.postDataSourceByObject(method, dataSource);
    this.utilsService.snackBarMessageSuccess(res.message);
    return res;
  }
  postFormulaRemove = async (method: ENInterfaces, UUID: string): Promise<any> => {
    const res = await this.ajaxReqWrapperService.postDataSourceByIdStringly(method, UUID);
    this.utilsService.snackBarMessageSuccess(res.message);
    return res;
  }
  postExcelFile = async (method: ENInterfaces) => {
    const formData: FormData = new FormData();

    formData.append('file', this.fileForm[0]);
    formData.append('rows', this.desc.rows);

    const res = await this.ajaxReqWrapperService.postDataSourceByObject(method, formData);
    this.utilsService.snackBarMessageSuccess(res.message);
    return (res);
  }
  /* VALIDATION */
  isNull = (): boolean => {
    if (MathS.isNull(this.desc.rows)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_excelRows);
      return false;
    }
    if (MathS.isNull(this.fileForm)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_excelFile);
      return false;
    }
    return true;
  }
  isInteger = (): boolean => {
    if (this.desc.rows.toString().includes('.')) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_without_decimal);
      return false;
    }
    return true;
  }
  isExcelFormat = (): boolean => {
    if (this.fileForm[0].name.split('.').pop() !== 'xlsx') {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_excel);
      return false;
    }
    return true;
  }
  validationEditableRow = (dataSource: object): boolean => {
    if (MathS.isNull(dataSource['id'])) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (this.utilsService.hasOwnProperty(dataSource['zoneId'])) {
      if (MathS.isNull(dataSource['zoneId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['karbariMoshtarakinCode'])) {
      if (MathS.isNull(dataSource['karbariMoshtarakinCode'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_karbariMoshtarakinCode);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['fromDate'])) {
      if (MathS.isNull(dataSource['fromDate'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['toDate'])) {
      if (MathS.isNull(dataSource['toDate'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['fromRate'])) {
      if (MathS.isNull(dataSource['fromRate'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_fromRate);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['toRate'])) {
      if (MathS.isNull(dataSource['toRate'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_toRate);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['abFormula'])) {
      if (MathS.isNull(dataSource['abFormula'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_abFormula);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['fazelabFormula'])) {
      if (MathS.isNull(dataSource['fazelabFormula'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_fazelabFormula);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['formula'])) {
      if (MathS.isNull(dataSource['formula'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_formula);
        return false;
      }
    }
    return true;
  }
  validationRate = (dataSource: IAbBahaFormula): boolean => {

    if (!MathS.isFromLowerThanTo(dataSource.fromRate, dataSource.toRate)) {
      this.utilsService.snackBarMessageWarn(EN_messages.lessThan_rate);
      return false;
    }
    return true;
  }
  private fromToValidation = (dynamicValue: any): boolean => {
    if (dynamicValue.hasOwnProperty('fromDate')) {
      if (!MathS.lengthControl(dynamicValue.fromDate, dynamicValue.fromDate, 9, 10)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_fromDate);
        return false;
      }
    }
    if (dynamicValue.hasOwnProperty('toDate')) {
      if (!MathS.lengthControl(dynamicValue.toDate, dynamicValue.toDate, 9, 10)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_toDate);
        return false;
      }
    }
    if (!MathS.lengthControl(dynamicValue['fromDate'], dynamicValue['fromDate'], 9, 10)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_fromDate);
      return false;
    }
    if (!MathS.lengthControl(dynamicValue['toDate'], dynamicValue['toDate'], 9, 10)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_toDate);
      return false;
    }
    return true;
  }
  /* VERIFICATION */

  vertificationExcel = (): boolean => {
    if (!this.isNull())
      return false;
    if (!this.isInteger())
      return false;
    if (!this.isExcelFormat())
      return false;
    return true;
  }
  checkVertitication = (filesList: FileList, data: any): boolean => {
    this.fileForm = filesList;
    this.desc = data;
    if (!this.vertificationExcel())
      return false;
    return true;
  }
  verificationEditedRow = (dataSource: IAbBahaFormula): boolean => {
    if (!this.validationEditableRow(dataSource))
      return false;
    if (!this.fromToValidation(dataSource))
      return false;
    if (!this.validationRate(dataSource))
      return false;
    return true;
  }
  verificationEditedRowTabsare2 = (dataSource: ITabsare2Formula): boolean => {
    if (!this.validationEditableRow(dataSource))
      return false;
    return true;
  }
  firstConfirmDialog = (text: string): Promise<any> => {
    const a = {
      messageTitle: EN_messages.confirm_remove,
      minWidth: '19rem',
      text: text,
      isInput: false,
      isDelete: true,
      icon: 'pi pi-trash'
    }
    return this.utilsService.firstConfirmDialog(a);
  }

}