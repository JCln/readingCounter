import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IAutomaticImport } from 'interfaces/ireads-manager';
import { CloseTabService } from 'services/close-tab.service';
import { FragmentManagerService } from 'services/fragment-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

import { AutoImportDgComponent } from './auto-import-dg/auto-import-dg.component';

@Component({
  selector: 'app-automatic-import',
  templateUrl: './automatic-import.component.html',
  styleUrls: ['./automatic-import.component.scss']
})
export class AutomaticImportComponent extends FactoryONE {

  dataSource: IAutomaticImport[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];

  constructor(
    private closeTabService: CloseTabService,
    private fragmentManagerService: FragmentManagerService,
    private dialog: MatDialog,
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForAutomaticImport = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForAutomaticImport) {
      this.dataSource = this.closeTabService.saveDataForAutomaticImport;
    }
    else {
      this.dataSource = await this.fragmentManagerService.getAutomaticDataSource(ENInterfaces.automaticImportAll);
      this.closeTabService.saveDataForAutomaticImport = this.dataSource;
    }
  }
  removeRow = async (id: string) => {
    if (await this.fragmentManagerService.firstConfirmDialog()) {
      await this.fragmentManagerService.postByQuote(ENInterfaces.automaticImportRemove, id);
    }
  }
  openAddDialog = (id: string) => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(AutoImportDgComponent, {
        disableClose: true,
        minWidth: '19rem',
        data: {
          dictionary: this.readingPeriodKindDictionary,
          fragmentMasterId: id
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.refreshTable();
      });
    });
  }

}

