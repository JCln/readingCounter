import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
import { ConfirmTextDialogComponent } from '../frame-work/manage/tracking/confirm-text-dialog/confirm-text-dialog.component';
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
    private snackWrapperService: SnackWrapperService,
    private dialog: MatDialog
  ) { }

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
  postFormulaAdd = (method: ENInterfaces, dataSource: object) => {
    dataSource['fromDate'] = Converter.persianToEngNumbers(dataSource['fromDate']);
    dataSource['toDate'] = Converter.persianToEngNumbers(dataSource['toDate']);
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTBODY(method, dataSource).toPromise().then((res: IResponses) => {
          this.utilsService.snackBarMessageSuccess(res.message);
          resolve(res);
        })
      });
    } catch (error) {
      console.error(error);
    }
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
  getZoneDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  getKarbariCodeDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getkarbariCodeDictionary();
  }
  postExcelFile = async (method: ENInterfaces) => {
    const formData: FormData = new FormData();

    formData.append('file', this.fileForm[0]);
    formData.append('rows', this.desc.rows);

    this.interfaceManagerService.POSTBODY(method, formData).toPromise().then((res: IResponses) => {
      this.utilsService.snackBarMessageSuccess(res.message);
    })
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
  firstConfirmDialog = (): Promise<any> => {
    const title = EN_messages.confirm_remove;
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        minWidth: '19rem',
        data: {
          title: title,
          isInput: false,
          isDelete: true
        }
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          resolve(desc);
        }
      })
    })
  }

}
