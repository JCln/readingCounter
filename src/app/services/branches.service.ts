import { PageSignsService } from 'services/page-signs.service';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { Injectable } from '@angular/core';
import { EN_messages, EN_tariff, ITariffManager } from 'interfaces/enums.enum';
import { UtilsService } from './utils.service';
import { ColumnManager } from '../classes/column-manager';
import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { VerificationService } from './verification.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MapDgComponent } from '../frame-work/manage/list-manager/all/map-dg/map-dg.component';

export const tarrifItems: ITariffManager[] = [
  { name: 'دریافت نمونه فایل', clickFunction: EN_tariff.getSampleExcel, icon: 'pi pi-cloud-download', background: '#F68038', color: '', description: EN_messages.confirmResetIIS },
  { name: 'Excel', clickFunction: EN_tariff.postExcelToFill, icon: 'fa fa-desktop', background: '#969696', color: '', description: EN_messages.confirmResetApp },
  { name: 'افزودن فایل', clickFunction: EN_tariff.AddExcel, icon: 'pi pi-file-excel', background: '#006c75', color: '', description: EN_messages.confirmServerDelete },
  { name: 'نمایش جدول', clickFunction: EN_tariff.viewGrid, icon: 'pi pi-file-excel', background: '#006c75', color: '', description: EN_messages.confirmServerDelete },
  { name: 'محاسبات', clickFunction: EN_tariff.calculation, icon: 'pi pi-calculator', background: '#006c75', color: '', description: EN_messages.confirmServerDelete },
]

@Injectable({
  providedIn: 'root'
})
export class BranchesService {
  ref: DynamicDialogRef;

  constructor(
    public utilsService: UtilsService,
    public columnManager: ColumnManager,
    public dictionaryWrapperService: DictionaryWrapperService,
    public pageSignsService: PageSignsService,
    public ajaxReqWrapperService: AjaxReqWrapperService,
    public verificationService: VerificationService,
    private dialogService: DialogService
  ) { }

  getManageServerItems = () => {
    return tarrifItems;
  }
  firstConfirmDialog = (text: string): Promise<any> => {
    const a = {
      messageTitle: EN_messages.confirm_remove,
      text: text,
      minWidth: '19rem',
      isInput: false,
      isDelete: true,
      icon: 'pi pi-trash'
    }
    return this.utilsService.firstConfirmDialog(a);
  }
  openMapDialog = (dataSource: any, isNewMarker: boolean): Promise<any> => {
    return new Promise((resolve) => {
      this.ref = this.dialogService.open(MapDgComponent, {
        data: { dataSource: dataSource, newMarker: isNewMarker },
        rtl: true,
        width: '80%'
      })
      this.ref.onClose.subscribe(async res => {
        if (res[0]) {
          resolve({ x: res[0], y: res[1] });
        }
        resolve('');
      });
    });

  }

}
