import { Injectable } from '@angular/core';
import { EN_messages } from 'src/app/Interfaces/enums.enum';
import { ENSnackBarColors, ENSnackBarTimes, IResponses } from 'src/app/Interfaces/ioverall-config';
import { DictionaryWrapperService } from 'src/app/services/dictionary-wrapper.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { SnackWrapperService } from 'src/app/services/snack-wrapper.service';
import { UtilsService } from 'src/app/services/utils.service';

import { IObjectIteratation } from './../Interfaces/ioverall-config';

@Injectable({
  providedIn: 'root'
})
export class FormulasService {
  private fileForm: FileList;
  private desc: any;

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private utilsService: UtilsService,
    private snackWrapperService: SnackWrapperService
  ) { }

  /* COLUMNS */

  columnAbFormulas = (): IObjectIteratation[] => {
    return [
      { field: 'zoneId', header: 'ناحیه', isSelected: true, readonly: true },
      { field: 'karbariMoshtarakinCode', header: 'کاربری مشترکین', isSelected: true, readonly: true },
      { field: 'fromDate', header: 'از', isSelected: true, readonly: true },
      { field: 'toDate', header: 'تا', isSelected: true, readonly: true },
      { field: 'fromRate', header: 'از نرخ', isSelected: true, readonly: true },
      { field: 'toRate', header: 'تا نرخ', isSelected: true, readonly: true },
      { field: 'abFormula', header: 'فرمول آب', isSelected: false, readonly: true },
      { field: 'fazelabFormula', header: 'فرمول فاضلاب', isSelected: false, readonly: true },
    ]
  }
  /* API CALLS */
  getAbBahaFormulaAll = (): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getAbBahaFormulaAll().toPromise().then(res => {
        resolve(res);
      })
    });
  }
  postAbBahaFormulaEdit = (body: object): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postAbBahaFormulaEdit(body).toPromise().then(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postAbBahaFormulaAdd = (body: object) => {
    this.interfaceManagerService.postAbBahaFormulaAdd(body).toPromise().then((res: IResponses) => {
      this.utilsService.snackBarMessageSuccess(res.message);
    })
  }
  private postAbBahaFormulaAddExcel = (body: object): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postAbBahaFormulaAddExcel(body).toPromise().then((res: IResponses) => {
          this.utilsService.snackBarMessageSuccess(res.message);
          resolve(true);
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postAbBahaFormulaRemove = (UUID: string): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postAbBahaFormulaRemove(UUID).toPromise().then(res => {
          this.utilsService.snackBarMessageSuccess(res.message);
          resolve(res);
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  getBudgetFormulaAll = () => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getBudgetFormulaAll().toPromise().then(res => {
        resolve(res);
      })
    });
  }
  postBudgetFormulaEdit = (body: object): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postBudgetFormulaEdit(body).toPromise().then(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postBudgetFormulaAdd = (body: object): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postBudgetFormulaAdd(body).toPromise().then(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postBudgetFormulaAddExcel = (body: object): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postBudgetFormulaAddExcel(body).toPromise().then(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postBudgetFormulaRemove = (UUID: string): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postBudgetFormulaRemove(UUID).toPromise().then(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  getTabsare2FormulaAll = () => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getTabsare2FormulaAll().toPromise().then(res => {
        resolve(res);
      })
    });
  }
  postTabsare2FormulaEdit = (body: object): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postTabsare2FormulaEdit(body).toPromise().then(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postTabsare2FormulaAdd = (body: object): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postTabsare2FormulaAdd(body).toPromise().then(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postTabsare2FormulaAddExcel = (body: object): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postTabsare2FormulaAddExcel(body).toPromise().then(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postTabsare2FormulaRemove = (UUID: string): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postTabsare2FormulaRemove(UUID).toPromise().then(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  getTabsare3FormulaAll = () => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getTabsare3FormulaAll().toPromise().then(res => {
        resolve(res);
      })
    });
  }
  postTabsare3FormulaEdit = (body: object): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postTabsare3FormulaEdit(body).toPromise().then(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postTabsare3FormulaAdd = (body: object): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postTabsare3FormulaAdd(body).toPromise().then(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postTabsare3FormulaAddExcel = (body: object): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postTabsare3FormulaAddExcel(body).toPromise().then(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postTabsare3FormulaRemove = (UUID: string): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postTabsare3FormulaRemove(UUID).toPromise().then(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  getZoneDictionary = () => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  getKarbariCodeDictionary = () => {
    return this.dictionaryWrapperService.getkarbariCodeDictionary();
  }
  postExcelFile = async () => {
    const formData: FormData = new FormData();

    console.log(this.fileForm);

    formData.append('file', this.fileForm[0]);
    formData.append('rows', this.desc.rows);

    await this.postAbBahaFormulaAddExcel(formData);
  }
  /* VALIDATION */
  isNull = (): boolean => {
    if (this.utilsService.isNull(this.desc.rows)) {
      this.snackWrapperService.openSnackBar(EN_messages.insert_excelRows, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return false;
    }
    if (this.utilsService.isNull(this.fileForm)) {
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
    if (this.utilsService.isNull(dataSource['id'])) {
      this.snackWrapperService.openSnackBar(EN_messages.call_supportGroup, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return false;
    }
    if (this.utilsService.hasOwnProperty(dataSource['zoneId'])) {
      if (this.utilsService.isNull(dataSource['zoneId'])) {
        this.snackWrapperService.openSnackBar(EN_messages.insert_zone, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['karbariMoshtarakinCode'])) {
      if (this.utilsService.isNull(dataSource['karbariMoshtarakinCode'])) {
        this.snackWrapperService.openSnackBar(EN_messages.insert_karbariMoshtarakinCode, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['fromDate'])) {
      if (this.utilsService.isNull(dataSource['fromDate'])) {
        this.snackWrapperService.openSnackBar(EN_messages.insert_fromDate, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['toDate'])) {
      if (this.utilsService.isNull(dataSource['toDate'])) {
        this.snackWrapperService.openSnackBar(EN_messages.insert_toDate, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['fromRate'])) {
      if (this.utilsService.isNull(dataSource['fromRate'])) {
        this.snackWrapperService.openSnackBar(EN_messages.insert_fromRate, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['toRate'])) {
      if (this.utilsService.isNull(dataSource['toRate'])) {
        this.snackWrapperService.openSnackBar(EN_messages.insert_toRate, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['abFormula'])) {
      if (this.utilsService.isNull(dataSource['abFormula'])) {
        this.snackWrapperService.openSnackBar(EN_messages.insert_abFormula, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
        return false;
      }
    }
    if (this.utilsService.hasOwnProperty(dataSource['fazelabFormula'])) {
      if (this.utilsService.isNull(dataSource['fazelabFormula'])) {
        this.snackWrapperService.openSnackBar(EN_messages.insert_fazelabFormula, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
        return false;
      }
    }
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
  verificationEditedRow = (dataSource: object): boolean => {
    if (this.validationEditableRow(dataSource))
      return false;
    return true;
  }
}
