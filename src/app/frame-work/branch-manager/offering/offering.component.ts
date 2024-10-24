import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { OfferingAddDgComponent } from './offering-add-dg/offering-add-dg.component';
import { MathS } from 'src/app/classes/math-s';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { Converter } from 'src/app/classes/converter';
import { IOfferingGroup, IOfferingUnit } from 'interfaces/i-branch';

@Component({
  selector: 'app-offering',
  templateUrl: './offering.component.html',
  styleUrls: ['./offering.component.scss']
})
export class OfferingComponent extends FactoryONE {
  ref: DynamicDialogRef;
  offeringUnitIdDictionary: IOfferingUnit[] = [];
  offeringGroupIdDictionary: IOfferingGroup[] = [];

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService,
    private dialogService: DialogService,
  ) {
    super();
  }
  insertToAuxItem = () => {
    this.closeTabService.offering.forEach(item => {
      item.dynamicId = item.offeringUnitId;
      item.dynamicGroupId = item.offeringGroupId;
    })
  }

  callAPI = async () => {
    this.closeTabService.offering = await this.branchesService.dictionaryWrapperService.getOffering(true);
    this.insertToAuxItem();
    this.offeringUnitIdDictionary = await this.branchesService.dictionaryWrapperService.getOfferingUnit(false);
    this.offeringGroupIdDictionary = await this.branchesService.dictionaryWrapperService.getOfferingGroup(false);
    Converter.convertIdsToTitles(
      this.closeTabService.offering,
      {
        offeringUnitIdDictionary: this.offeringUnitIdDictionary,
        offeringGroupIdDictionary: this.offeringGroupIdDictionary
      },
      {
        dynamicId: 'dynamicId',
        dynamicGroupId: 'dynamicGroupId'
      }
    )
  }
  openDialog = (item?: any) => {
    this.ref = this.dialogService.open(OfferingAddDgComponent, {
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
    if (MathS.isNull(this.closeTabService.offering)) {
      this.callAPI();
    }
  }
  removeRow = async (rowData: object) => {
    if (await this.branchesService.firstConfirmDialog('عنوان: ' + rowData['title'])) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.offeringRemove, rowData);
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }

}
