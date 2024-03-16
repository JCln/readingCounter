import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IBlockOrSafeIp } from 'interfaces/iserver-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ReadManagerService } from 'services/read-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { UserBlockingComponent } from 'src/app/shared/user-blocking/user-blocking.component';

@Component({
  selector: 'app-ip-filter',
  templateUrl: './ip-filter.component.html',
  styleUrls: ['./ip-filter.component.scss']
})
export class IpFilterComponent extends FactoryONE {
  userAllDictionary: IDictionaryManager[] = [];
  emptyObject = {
    id: 0,
    ip: '',
    subnet: '',
    targetUserDisplayName: '',
    targetUsername: '',
    userId: '',
    isSafe: false,
    isV6: false,
    isNew: false
  }

  constructor(
    public closeTabService: CloseTabService,
    public readManagerService: ReadManagerService,
  ) {
    super();
  }

  callAPI = async () => {
    this.closeTabService.ipFilterRes = await this.readManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.GetIpFilter);
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.ipFilterRes)) {
      this.callAPI();
    }
    this.showDialogOnStart();
  }
  removeRow = async (dataSource: IBlockOrSafeIp) => {
    if (!this.readManagerService.verificationBlockOrSafeIP(dataSource))
      return;

    const confirmed = await this.readManagerService.firstConfirmDialog('IP: ' + dataSource.ip);
    if (confirmed) {
      const a = await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.RemoveIpFilter, dataSource);
      if (a) {
        this.callAPI();
      }
    }
  }
  openAddDialog = (dataSource: IBlockOrSafeIp, isNew: boolean) => {
    dataSource.isNew = isNew;
    return new Promise(() => {
      const dialogRef = this.closeTabService.utilsService.dialog.open(UserBlockingComponent, {
        disableClose: true,
        minWidth: '65vw',
        data: {
          di: dataSource
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.callAPI();
      });
    });
  }
  async showDialogOnStart() {
    const config = {
      messageTitle: EN_messages.learnFirst,
      messageTitleTwo: EN_messages.learnFirstDesc,
      text: EN_messages.ipFilterAnyChange,
      minWidth: '21rem',
      isInput: false,
      isDelete: true,
      icon: 'pi pi-info-circle',
      doesNotReturnButton: false
    }
    this.closeTabService.utilsService.firstConfirmDialog(config);
    // TODO: call opened more details dialog    

  }


}
