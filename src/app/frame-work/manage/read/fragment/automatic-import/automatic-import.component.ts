import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { FragmentManagerService } from 'services/fragment-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

import { AutoImportDgComponent } from './auto-import-dg/auto-import-dg.component';
import { AutoImportEditDgComponent } from './auto-import-edit-dg/auto-import-edit-dg.component';

@Component({
  selector: 'app-automatic-import',
  templateUrl: './automatic-import.component.html',
  styleUrls: ['./automatic-import.component.scss']
})
export class AutomaticImportComponent extends FactoryONE {
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  userCounterReader: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  ref: DynamicDialogRef;

  constructor(
    public closeTabService: CloseTabService,
    public fragmentManagerService: FragmentManagerService,
    private dialog: MatDialog,
    private dialogService: DialogService,
  ) {
    super();
  }

  classWrapper = async () => {
    if (!this.fragmentManagerService.pageSignsService.fragmentAutomaticImport_pageSign.GUid) {
      this.fragmentManagerService.routeToFragmentMaster();
      return;
    }
    this.closeTabService.saveDataForAutomaticImport = await this.fragmentManagerService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.automaticImportByFragment, this.fragmentManagerService.pageSignsService.fragmentAutomaticImport_pageSign.GUid);
    this.readingPeriodKindDictionary = await this.fragmentManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.zoneDictionary = await this.fragmentManagerService.dictionaryWrapperService.getZoneDictionary();  
    this.userCounterReader = await this.fragmentManagerService.dictionaryWrapperService.getUserCounterReaderDictionary(this.fragmentManagerService.pageSignsService.fragmentAutomaticImport_pageSign.zoneId);
  }
  removeRow = async (rowData: string) => {
    if (await this.fragmentManagerService.firstConfirmDialog()) {
      const res = await this.fragmentManagerService.ajaxReqWrapperService.postDataSourceByIdStringly(ENInterfaces.automaticImportRemove, rowData['dataSource'].id);
      this.fragmentManagerService.utilsService.snackBarMessageSuccess(res.message);
      this.refreshTable();
    }
  }
  openAddDialog = () => {
    this.ref = this.dialogService.open(AutoImportDgComponent, {
      data: {
        fragmentMasterId: this.fragmentManagerService.pageSignsService.fragmentAutomaticImport_pageSign.GUid,
        dictionary: this.readingPeriodKindDictionary,
        counterReaders: this.userCounterReader
      },
      rtl: true,
      contentStyle: { minWidth: '21rem' }
    })
    this.ref.onClose.subscribe(async res => {
      if (res)
        this.refreshTable();
    });
  }
  openEditDialog = (body: object) => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(AutoImportEditDgComponent, {
        disableClose: true,
        minWidth: '65vw',
        data: {
          dictionary: this.readingPeriodKindDictionary,
          body: body
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.refreshTable();
      });
    });
  }

}

