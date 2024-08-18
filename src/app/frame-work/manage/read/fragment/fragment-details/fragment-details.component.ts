import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { FragmentManagerService } from 'services/fragment-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { FdDgComponent } from './fd-dg/fd-dg.component';
import { PageSignsService } from 'services/page-signs.service';


@Component({
  selector: 'app-fragment-details',
  templateUrl: './fragment-details.component.html',
  styleUrls: ['./fragment-details.component.scss']
})
export class FragmentDetailsComponent extends FactoryONE {
  ref: DynamicDialogRef;
  cellColorObject = {
    from: this.pageSignsService.fragmentDetails_pageSign.fromEshterak,
    fromName: 'fromEshterak',
    to: this.pageSignsService.fragmentDetails_pageSign.toEshterak,
    toName: 'toEshterak'
  }
  readonly fragmentDetailsColumns: string = 'fragmentDetails';

  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    public closeTabService: CloseTabService,
    public fragmentManagerService: FragmentManagerService,
    private dialogService: DialogService,
    public pageSignsService: PageSignsService
  ) {
    super();
  }

  callAPI = async () => {
    this.closeTabService.saveDataForFragmentNOBDetails = await this.fragmentManagerService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.fragmentDETAILSDETAILS, this.fragmentManagerService.pageSignsService.fragmentDetails_pageSign.GUid);
    this.closeTabService.fragmentNOBDetailsGUID = this.fragmentManagerService.pageSignsService.fragmentDetails_pageSign.GUid;
  }
  classWrapper = async () => {
    if (!this.fragmentManagerService.pageSignsService.fragmentDetails_pageSign.GUid) {
      this.fragmentManagerService.routeToFragmentMaster();
    }

    else {
      if (
        this.closeTabService.fragmentNOBDetailsGUID != this.fragmentManagerService.pageSignsService.fragmentDetails_pageSign.GUid ||
        MathS.isNull(this.closeTabService.saveDataForFragmentNOBDetails)
      ) {
        this.callAPI();
      }
    }
  }
  openDialog = (isEditing: boolean, item?: any) => {
    const test = !item ? this.fragmentManagerService.pageSignsService.fragmentDetails_pageSign.GUid : item;
    console.log(test);
    // TODO: if there is no item ( user click on add button) then send fragment master GUID 
    this.ref = this.dialogService.open(FdDgComponent, {
      data: {
        data: !item ? this.fragmentManagerService.pageSignsService.fragmentDetails_pageSign.GUid : item,
        isEditing: isEditing
      },
      rtl: true,
      contentStyle: { minWidth: '21rem' }
    })
    this.ref.onClose.subscribe(async res => {
      if (res) {
        this.callAPI();
      }
    });
  }
  removeRow = async (dataSource: any) => {
    if (!this.fragmentManagerService.verificationService.verificationDetails(dataSource))
      return;
    const textMessage = 'از اشتراک: ' + dataSource.fromEshterak + ' تا اشتراک: ' + dataSource.toEshterak;
    const confirmed = await this.fragmentManagerService.firstConfirmDialog(textMessage);

    if (confirmed) {
      const res = await this.fragmentManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.fragmentDETAILSREMOVE, dataSource);
      if (res) {
        this.fragmentManagerService.utilsService.snackBarMessageSuccess(res.message);
        this.callAPI();
      }
    }

  }


}