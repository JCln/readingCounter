import { IprulesEditDgComponent } from './iprules-edit-dg/iprules-edit-dg.component';
import { IprulesAddDgComponent } from './iprules-add-dg/iprules-add-dg.component';
import { ManageServerService } from 'services/manage-server.service';
import { Component } from '@angular/core';
import { FactoryONE } from 'src/app/classes/factory';
import { CloseTabService } from 'services/close-tab.service';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';

@Component({
  selector: 'app-ip-special-rules',
  templateUrl: './ip-special-rules.component.html',
  styleUrls: ['./ip-special-rules.component.scss']
})
export class IpSpecialRulesComponent extends FactoryONE {
  constructor(
    public closeTabService: CloseTabService,
    public manageServerService: ManageServerService
  ) {
    super();
  }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.manageServerService.utilsService.dialog.open(IprulesAddDgComponent, {
        disableClose: true,
        minWidth: '65vw',
        width: '100%',
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.refreshTable();
      });
    });
  }
  openEditDialog = (row: object) => {
    console.log(row);

    return new Promise(() => {
      const dialogRef = this.manageServerService.utilsService.dialog.open(IprulesEditDgComponent, {
        disableClose: true,
        minWidth: '65vw',
        width: '100%',
        data: {
          row
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          console.log(result);
          console.log('please do server edit request');

          // if (await this.manageServerService.addOrEditAuths(ENInterfaces.ReadingConfigEDIT, result)) {
          // this.refreshTable();
          // }
        }
      });
    })
  }
  getRulesFromDataSource = (data: any): any[] => {
    let temp: any[] = [];
    for (let index = 0; index < data.length; index++) {
      let ip = data[index].ip;
      for (let j = 0; j < data[index].rules.length; j++) {
        data[index].rules[j].ip = ip;
        temp.push(data[index].rules[j]);
      }
    }
    return temp;
  }
  nullSavedSource = () => this.closeTabService.saveDataForIpSpecialRules = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    // multiple requests send to server bug have seen
    if (!this.closeTabService.saveDataForIpSpecialRules) {
      this.closeTabService.saveDataForIpSpecialRules = await this.manageServerService.ajaxReqWrapperService.getDataSource(ENInterfaces.ipRateManager);
      this.closeTabService.saveDataForIpSpecialRules = this.getRulesFromDataSource(this.closeTabService.saveDataForIpSpecialRules.ipRules);
      console.log(this.closeTabService.saveDataForIpSpecialRules);

    }
  }
  // removeRow = async (rowData: object) => {
  //   const a = await this.manageServerService.firstConfirmDialog('ناحیه: ' + rowData['dataSource'].zoneId);
  //   if (a) {
  //     await this.manageServerService.deleteSingleRow(ENInterfaces.ReadingConfigREMOVE, rowData['dataSource'].id);
  //     this.refetchTable(rowData['ri']);
  //   }
  // }

}
