import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IAutomaticImport } from 'interfaces/ireads-manager';
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

  @Input() fragmentMasterId: string;
  @Input() zoneId: any;
  @Output() fragmentLatestValue = new EventEmitter<any>();

  dataSource: IAutomaticImport[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  userCounterReader: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  ref: DynamicDialogRef;

  constructor(
    private closeTabService: CloseTabService,
    private fragmentManagerService: FragmentManagerService,
    private dialog: MatDialog,
    private dialogService: DialogService,
  ) {
    super();
  }

  fragmentToNull = () => {
    //available to back to previous page by makeFragment null;
    this.fragmentMasterId = '';
    this.fragmentLatestValue.emit(this.fragmentMasterId);
  }
  classWrapper = async (canRefresh?: boolean) => {
    this.dataSource = await this.fragmentManagerService.getDataSourceByQuote(ENInterfaces.automaticImportByFragment, this.fragmentMasterId);
    this.readingPeriodKindDictionary = await this.fragmentManagerService.getPeriodKindDictionary();
    this.zoneDictionary = await this.fragmentManagerService.getZoneDictionary();
    this.zoneDictionary.find(item => {
      if (item.title === this.zoneId)
        this.zoneId = item.id
    })

    this.userCounterReader = await this.fragmentManagerService.getUserCounterReaders(this.zoneId);
    this.closeTabService.saveDataForAutomaticImport = this.dataSource;
  }
  removeRow = async (id: string) => {
    if (await this.fragmentManagerService.firstConfirmDialog()) {
      await this.fragmentManagerService.postByQuote(ENInterfaces.automaticImportRemove, id['dataSource']);
      this.refreshTable();
    }
  }
  openAddDialog = () => {
    this.ref = this.dialogService.open(AutoImportDgComponent, {
      data: {
        dictionary: this.readingPeriodKindDictionary,
        fragmentMasterId: this.fragmentMasterId,
        counterReaders: this.userCounterReader
      },
      rtl: true,
      width: '70%'
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
        minWidth: '19rem',
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

