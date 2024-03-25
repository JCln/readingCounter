import { PageSignsService } from 'services/page-signs.service';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { Injectable } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { UtilsService } from './utils.service';
import { ColumnManager } from '../classes/column-manager';
import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { VerificationService } from './verification.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MapDgComponent } from '../frame-work/manage/list-manager/all/map-dg/map-dg.component';

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
        if (res) {
          resolve({ x: res[0], y: res[1] });
        }
        resolve('');
      });
    });

  }

}
