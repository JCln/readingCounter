import { OutputManagerService } from './../../../../services/output-manager.service';
import { BranchesService } from 'services/branches.service';
import { Component } from '@angular/core';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RatesDgComponent } from './rates-dg/rates-dg.component';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { MathS } from 'src/app/classes/math-s';
import { EN_messages } from 'interfaces/enums.enum';

@Component({
  selector: 'app-excel-to-fill',
  templateUrl: './excel-to-fill.component.html',
  styleUrls: ['./excel-to-fill.component.scss']
})
export class ExcelToFillComponent extends FactoryONE {
  private readonly columnName: string = 'tariffExcelToFill';
  _selectCols: any[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  siphonDictionary: any[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  getTarrifTypeDictionary: any[] = [];
  offeringDictionary: any[] = [];
  diameterDictionary: any[] = [];
  ref: DynamicDialogRef;

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService,
    private dialogService: DialogService
  ) {
    super();
  }

  getNesseseriesByZone = async () => {
    this.zoneDictionary = await this.branchesService.dictionaryWrapperService.getZoneDictionary();
    this.siphonDictionary = await this.branchesService.dictionaryWrapperService.getSiphonDictionary(false);
    this.diameterDictionary = await this.branchesService.dictionaryWrapperService.getQotrDictionary();
    this.karbariDictionary = await this.branchesService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.offeringDictionary = await this.branchesService.dictionaryWrapperService.getOffering(false);
    this.getTarrifTypeDictionary = await this.branchesService.ajaxReqWrapperService.getDataSource(ENInterfaces.tarriffTypeItemManagerGet);
  }
  classWrapper = async () => {
    this._selectCols = this.branchesService.columnManager.getColumnsMenus(this.columnName);
    this.getNesseseriesByZone();
  }
  async connectToServer() {
  }
  verification = async () => {
    if (this.branchesService.verificationService.tarriffManager(this.closeTabService.tariffExcelToFillInput)) {
      const res = await this.branchesService.ajaxReqWrapperService.postBlobObserve(ENInterfaces.tariffExcelToFill, this.closeTabService.tariffExcelToFillInput);
      this.branchesService.outputManagerService.downloadFileWithContentDisposition(res);
    }
  }
  async emptyBeforeCloseRatesDialog() {
    let res: any = this.closeTabService.tariffExcelToFillInput.rates;

    let haveValueNumbers: number = 0;
    for (let index = 0; index < res.length; index++) {
      if (!MathS.isNull(res[index].fromRate) || !MathS.isNull(res[index].toRate))
        haveValueNumbers++;
    }
    // if there is a value in any item of rates than warn user, else empty the array
    if (haveValueNumbers > 0) {
      const config = {
        messageTitle: `تعداد ${haveValueNumbers} نرخ تعیین شده است`,
        text: EN_messages.confirm_removeAll,
        minWidth: '21rem',
        isInput: false,
        isDelete: true,
        isImportant: true,
        icon: 'pi pi-minus-circle'
      }
      const confirmed = await this.closeTabService.utilsService.primeConfirmDialog(config);

      if (confirmed) {
        this.closeTabService.tariffExcelToFillInput.rates = [];
      }
      else {
        // reOpen dialog to complete by user
        this.openRatesDialog();
      }
    }
    else {
      this.closeTabService.tariffExcelToFillInput.rates = [];
    }
  }
  openRatesDialog = () => {
    this.ref = this.dialogService.open(RatesDgComponent, {
      data: this.closeTabService.tariffExcelToFillInput.rates ? this.closeTabService.tariffExcelToFillInput.rates : null,
      rtl: true,
      contentStyle: { minWidth: '21rem' }
    })
    this.ref.onClose.subscribe(async res => {
      if (res) {
        this.closeTabService.tariffExcelToFillInput.rates = res;
      }
      else {
        this.emptyBeforeCloseRatesDialog();
      }
    });
  }


}
