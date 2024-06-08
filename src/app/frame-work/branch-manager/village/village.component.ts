import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { VillageDgComponent } from './village-dg/village-dg.component';
import { Converter } from 'src/app/classes/converter';
import { IDictionaryManager } from 'interfaces/ioverall-config';

@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  styleUrls: ['./village.component.scss']
})
export class VillageComponent extends FactoryONE {
  zoneDictionary: IDictionaryManager[] = [];
  ref: DynamicDialogRef;

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService,
    public dialogService: DialogService
  ) {
    super();
  }
  insertToAuxZoneid = () => {
    this.closeTabService.village.forEach(item => {
      item.changableZoneId = item.zoneId;
    })
  }
  callAPI = async () => {
    this.closeTabService.village = await this.branchesService.dictionaryWrapperService.getVillageDictionary();
    this.zoneDictionary = await this.branchesService.dictionaryWrapperService.getZoneDictionary();
    this.insertToAuxZoneid();
    Converter.convertIdToTitle(this.closeTabService.village, this.zoneDictionary, 'changableZoneId');
  }
  openDialog = (item?: any) => {
    this.ref = this.dialogService.open(VillageDgComponent, {
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
    if (MathS.isNull(this.closeTabService.village)) {
      this.callAPI();
    }
  }
  removeRow = async (rowData: object) => {
    if (await this.branchesService.firstConfirmDialog('عنوان: ' + rowData['title'])) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.villageRemove, rowData);
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }

}
