import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import {
  ENSelectedColumnVariables,
  ENSnackBarColors,
  ENSnackBarTimes,
  IObjectIteratation,
  IResponses,
} from 'interfaces/ioverall-config';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { SnackWrapperService } from 'services/snack-wrapper.service';
import { UtilsService } from 'services/utils.service';

import { Converter } from '../classes/converter';
import { MathS } from '../classes/math-s';
import { IAbBahaFormula, ITabsare2Formula } from '../Interfaces/ireads-manager';

@Injectable({
  providedIn: 'root'
})
export class FormulasService {
  private fileForm: FileList;
  private desc: any;
  ENSelectedColumnVariables = ENSelectedColumnVariables;

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private utilsService: UtilsService,
    private snackWrapperService: SnackWrapperService
  ) { }

  /* COLUMNS */
  private _abFormulas = [
    { field: 'zoneId', header: 'ناحیه', isSelected: true, readonly: true, isSelectOption: true },
    { field: 'karbariMoshtarakinCode', header: 'کاربری مشترکین', isSelected: true, readonly: true, isSelectOption: true },
    { field: 'fromDate', header: 'از', isSelected: true, readonly: true },
    { field: 'toDate', header: 'تا', isSelected: true, readonly: true },
    { field: 'fromRate', header: 'از نرخ', isSelected: true, readonly: true },
    { field: 'toRate', header: 'تا نرخ', isSelected: true, readonly: true },
    { field: 'abFormula', header: 'فرمول آب', isSelected: false, readonly: true, ltr: true },
    { field: 'fazelabFormula', header: 'فرمول فاضلاب', isSelected: false, readonly: true, ltr: true },
  ]
  private _budgetFormulas: IObjectIteratation[] = [
    { field: 'zoneId', header: 'ناحیه', isSelected: true, readonly: true, isSelectOption: true },
    { field: 'karbariMoshtarakinCode', header: 'کاربری مشترکین', isSelected: true, readonly: true },
    { field: 'fromDate', header: 'از', isSelected: true, readonly: true },
    { field: 'toDate', header: 'تا', isSelected: true, readonly: true },
    { field: 'fromRate', header: 'از نرخ', isSelected: true, readonly: true },
    { field: 'toRate', header: 'تا نرخ', isSelected: true, readonly: true },
    { field: 'formula', header: 'فرمول', isSelected: false, readonly: true, ltr: true }
  ]
  private _tabsare2Formulas = [
    { field: 'zoneId', header: 'ناحیه', isSelected: true, readonly: true, isSelectOption: true },
    { field: 'formula', header: 'فرمول', isSelected: true, readonly: true, ltr: true }
  ]
  private _tabsare3Formulas = [
    { field: 'zoneId', header: 'ناحیه', isSelected: true, readonly: true, isSelectOption: true },
    { field: 'karbariMoshtarakinCode', header: 'کاربری مشترکین', isSelected: true, readonly: true, isSelectOption: true },
    { field: 'fromDate', header: 'از', isSelected: true, readonly: true },
    { field: 'toDate', header: 'تا', isSelected: true, readonly: true },
    { field: 'fromRate', header: 'از نرخ', isSelected: true, readonly: true },
    { field: 'toRate', header: 'تا نرخ', isSelected: true, readonly: true },
    { field: 'abFormula', header: 'فرمول آب', isSelected: false, readonly: true, ltr: true },
    { field: 'fazelabFormula', header: 'فرمول فاضلاب', isSelected: false, readonly: true, ltr: true },
    { field: 'formula', header: 'فرمول', isSelected: false, readonly: true, ltr: true }
  ]

  columnAbFormulas = (): IObjectIteratation[] => {
    return this._abFormulas;
  }
  columnBudgetFormulas = (): IObjectIteratation[] => {
    return this._budgetFormulas;
  }
  columnTabsare2Formulas = (): IObjectIteratation[] => {
    return this._tabsare2Formulas;
  }
  columnTabsare3Formulas = (): IObjectIteratation[] => {
    return this._tabsare3Formulas;
  }
  /* API CALLS */
  postFormulaEdit = (method: ENInterfaces, body: object): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTBODY(method, body).toPromise().then((res: IResponses) => {
          this.utilsService.snackBarMessageSuccess(res.message);
          resolve(res);
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postFormulaAdd = (method: ENInterfaces, body: object) => {
    body['fromDate'] = Converter.persianToEngNumbers(body['fromDate']);
    body['toDate'] = Converter.persianToEngNumbers(body['toDate']);
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTBODY(method, body).toPromise().then((res: IResponses) => {
          this.utilsService.snackBarMessageSuccess(res.message);
          resolve(res);
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  private postAbBahaFormulaAddExcel = (body: object) => {
    this.interfaceManagerService.POSTBODY(ENInterfaces.FormulaWaterAddExcel, body).toPromise().then((res: IResponses) => {
      this.utilsService.snackBarMessageSuccess(res.message);
    })
  }
  postFormulaRemove = (method: ENInterfaces, UUID: string): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTSG(method, UUID).toPromise().then((res: IResponses) => {
          this.utilsService.snackBarMessageSuccess(res.message);
          resolve(res);
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  getFormulaAll = (method: ENInterfaces): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(method).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  private postBudgetFormulaAddExcel = (body: object) => {
    this.interfaceManagerService.POSTBODY(ENInterfaces.FormulaBudgetAddExcel, body).toPromise().then((res: IResponses) => {
      this.utilsService.snackBarMessageSuccess(res.message);
    })
  }
  private postTabsare3FormulaAddExcel = (body: object) => {
    this.interfaceManagerService.POSTBODY(ENInterfaces.FormulaTabsare3AddExcel, body).toPromise().then((res: IResponses) => {
      this.utilsService.snackBarMessageSuccess(res.message);
    });
  }
  getZoneDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  getKarbariCodeDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getkarbariCodeDictionary();
  }
  postExcelFile = async (method: string) => {
    const formData: FormData = new FormData();

    console.log(this.fileForm);

    formData.append('file', this.fileForm[0]);
    formData.append('rows', this.desc.rows);

    await this[method](formData);
  }
  getExcelSample = (method: ENInterfaces): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETBLOB(method).toPromise().then(res => {
          resolve(res);
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  /* VALIDATION */
  isNull = (): boolean => {
    if (MathS.isNull(this.desc.rows)) {
      this.snackWrapperService.openSnackBar(EN_messages.insert_excelRows, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return false;
    }
    if (MathS.isNull(this.fileForm)) {
      this.snackWrapperService.openSnackBar(EN_messages.insert_excelFile, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }
  isInteger = (): boolean => {
    if (this.desc.rows.toString().includes('.')) {
      this.snackWrapperService.openSnackBar(EN_messages.insert_without_decimal, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }
  isExcelFormat = (): boolean => {
    if (this.fileForm[0].name.split('.').pop() !== 'xlsx') {
      this.snackWrapperService.openSnackBar(EN_messages.format_invalid_excel, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }
  validationEditableRow = (dataSource: object): boolean => {
    if (MathS.isNull(dataSource['id'])) {
      this.snackWrapperService.openSnackBar(EN_messages.call_supportGroup, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return false;
    }
    if (this.utilsService.hasOwnProperty(dataSource['zoneId'])) {
      if (MathS.isNull(dataSource['zoneId'])) {
        this.snackWrapperService.openSnackBar(EN_messages.insert_zone, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['karbariMoshtarakinCode'])) {
      if (MathS.isNull(dataSource['karbariMoshtarakinCode'])) {
        this.snackWrapperService.openSnackBar(EN_messages.insert_karbariMoshtarakinCode, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['fromDate'])) {
      if (MathS.isNull(dataSource['fromDate'])) {
        this.snackWrapperService.openSnackBar(EN_messages.insert_fromDate, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['toDate'])) {
      if (MathS.isNull(dataSource['toDate'])) {
        this.snackWrapperService.openSnackBar(EN_messages.insert_toDate, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['fromRate'])) {
      if (MathS.isNull(dataSource['fromRate'])) {
        this.snackWrapperService.openSnackBar(EN_messages.insert_fromRate, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['toRate'])) {
      if (MathS.isNull(dataSource['toRate'])) {
        this.snackWrapperService.openSnackBar(EN_messages.insert_toRate, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['abFormula'])) {
      if (MathS.isNull(dataSource['abFormula'])) {
        this.snackWrapperService.openSnackBar(EN_messages.insert_abFormula, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['fazelabFormula'])) {
      if (MathS.isNull(dataSource['fazelabFormula'])) {
        this.snackWrapperService.openSnackBar(EN_messages.insert_fazelabFormula, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['formula'])) {
      if (MathS.isNull(dataSource['formula'])) {
        this.snackWrapperService.openSnackBar(EN_messages.insert_formula, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
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
    if (dynamicValue.hasOwnProperty('toDate')) {
      if (!MathS.lengthControl(dynamicValue.toDate, dynamicValue.toDate, 9, 10)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_date);
        return false;
      }
    }
    if (dynamicValue.hasOwnProperty('fromDate')) {
      if (!MathS.lengthControl(dynamicValue.fromDate, dynamicValue.fromDate, 9, 10)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_date);
        return false;
      }
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
  setColumnsChanges = (variableName: string, newValues: IObjectIteratation[]) => {
    // convert all items to false
    this[variableName].forEach(old => {
      old.isSelected = false;
    })

    // merge new values
    this[variableName].find(old => {
      newValues.find(newVals => {
        if (newVals.field == old.field)
          old.isSelected = true;
      })
    })
  }
  customizeSelectedColumns = (_selectCols: any) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }

}
