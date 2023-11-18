import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IBlockOrSafeIp } from 'interfaces/iserver-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ReadManagerService } from 'services/read-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
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

  nullSavedSource = () => this.closeTabService.ipFilterRes = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.ipFilterRes) {
      this.closeTabService.ipFilterRes = await this.readManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.GetIpFilter);
    }
  }
  removeRow = async (dataSource: IBlockOrSafeIp) => {
    if (!this.readManagerService.verificationBlockOrSafeIP(dataSource))
      return;

    const confirmed = await this.readManagerService.firstConfirmDialog('IP: ' + dataSource.ip);
    if (confirmed) {
      const a = await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.RemoveIpFilter, dataSource);
      if (a) {
        this.refreshTable();
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
          this.refreshTable();
      });
    });
  }


}
