import { BranchesService } from 'services/branches.service';
import { Component } from '@angular/core';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-tarrif-type-item',
  templateUrl: './tarrif-type-item.component.html',
  styleUrls: ['./tarrif-type-item.component.scss']
})
export class TarrifTypeItemComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService
  ) {
    super();
  }

  // openAddDialog = () => {
  //   return new Promise(() => {
  //     const dialogRef = this.dialog.open(RdAddDgComponent, {
  //       disableClose: true,
  //       minWidth: '65vw',
  //       width: '100%',
  //       data: {
  //         di: this.zoneDictionary
  //       }
  //     });
  //     dialogRef.afterClosed().subscribe(async result => {
  //       if (result)
  //         this.callAPI();
  //     });
  //   });
  // }
  // openEditDialog = (row: any) => {
  //   return new Promise(() => {
  //     const dialogRef = this.dialog.open(RdEditDgComponent, {
  //       disableClose: true,
  //       minWidth: '65vw',
  //       width: '100%',
  //       data: {
  //         row,
  //         di: this.zoneDictionary
  //       }
  //     });
  //     dialogRef.afterClosed().subscribe(async result => {
  //       if (result) {
  //         if (await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.ReadingConfigEDIT, result)) {
  //           this.callAPI();
  //         }
  //       }
  //     });
  //   })
  // }
  callAPI = async () => {
    // this.closeTabService.saveDataForReadingConfig = await this.readManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.ReadingConfigALL);



  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForReadingConfig)) {
      this.callAPI();
    }
  }
  removeRow = async (rowData: object) => {
    // const a = await this.readManagerService.firstConfirmDialog('ناحیه: ' + rowData['dataSource'].zoneId);
    // if (a) {
    //   await this.readManagerService.deleteSingleRow(ENInterfaces.ReadingConfigREMOVE, rowData['dataSource'].id);
    //   this.callAPI();
    // }
  }

}
