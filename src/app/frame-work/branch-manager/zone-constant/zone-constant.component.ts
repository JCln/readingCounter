import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { ZoneConstantDgComponent } from './zone-constant-dg/zone-constant-dg.component';
import { IZoneConstants } from 'interfaces/i-branch';

@Component({
  selector: 'app-zone-constant',
  templateUrl: './zone-constant.component.html',
  styleUrls: ['./zone-constant.component.scss']
})
export class ZoneConstantComponent extends FactoryONE {
  zoneDictionary: IDictionaryManager[] = [];
  zoneConstantDictionary: any[] = [];
  ref: DynamicDialogRef;

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService,
    public dialogService: DialogService
  ) {
    super();
  }
  insertToAuxZoneid = () => {
    this.closeTabService.zoneConstants.forEach(item => {
      item.changableZoneId = item.zoneId;
    })
  }
  callAPI = async () => {
    this.closeTabService.zoneConstants = await this.branchesService.dictionaryWrapperService.getZoneConstantsDictionary(true);
    this.zoneDictionary = await this.branchesService.dictionaryWrapperService.getZoneDictionary();
    this.insertToAuxZoneid();
    Converter.convertIdToTitle(this.closeTabService.zoneConstants, this.zoneDictionary, 'changableZoneId');
  }
  openDialog = (item?: any) => {
    this.ref = this.dialogService.open(ZoneConstantDgComponent, {
      data: item,
      rtl: true,
      contentStyle: { minWidth: '21rem' }
    })
    this.ref.onClose.subscribe(async res => {
      if (res) {
        this.callAPI();
      }
    });
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.zoneConstants)) {
      this.callAPI();
    }
  }
  removeRow = async (rowData: IZoneConstants) => {
    if (await this.branchesService.firstConfirmDialog('عنوان: ' + rowData.title + ',' + 'ناحیه: ' + rowData.zoneTitle)) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ZoneConstantRemove, rowData);
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }

}
