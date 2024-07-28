import { Component } from '@angular/core';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { TagDgComponent } from './tag-dg/tag-dg.component';
import { MathS } from 'src/app/classes/math-s';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';

@Component({
  selector: 'app-tag-manager',
  templateUrl: './tag-manager.component.html',
  styleUrls: ['./tag-manager.component.scss']
})
export class TagManagerComponent extends FactoryONE {
  zoneDictionary: IDictionaryManager[] = [];
  ref: DynamicDialogRef;

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService,
    public dialogService: DialogService
  ) {
    super();
  }
  callAPI = async () => {
    this.closeTabService.tag = await this.branchesService.dictionaryWrapperService.getTagDictionary(true);
  }
  openDialog = (item?: any) => {
    this.ref = this.dialogService.open(TagDgComponent, {
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
    if (MathS.isNull(this.closeTabService.tag)) {
      this.callAPI();
    }
  }
  removeRow = async (rowData: object) => {
    if (await this.branchesService.firstConfirmDialog('عنوان فارسی: ' + rowData['title'] + ',' + 'عنوان: ' + rowData['titleEn'])) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.TagRemove, rowData);
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }

}
