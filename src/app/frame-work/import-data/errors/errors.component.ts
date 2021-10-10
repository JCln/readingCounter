import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IImportErrors } from 'interfaces/import-data';
import { CloseTabService } from 'services/close-tab.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { InteractionService } from 'services/interaction.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent extends FactoryONE {
  dataSource: IImportErrors[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    public interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private importDynamicService: ImportDynamicService,
  ) {
    super();
  }

  insertSelectedColumns = () => {
    this._selectCols = this.importDynamicService.columnErrors();
    this._selectedColumns = this.importDynamicService.customizeSelectedColumns(this._selectCols);
  }
  nullSavedSource = () => this.closeTabService.saveDataForImportErrors = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForImportErrors) {
      this.dataSource = this.closeTabService.saveDataForImportErrors;
    }
    else {
      this.dataSource = await this.importDynamicService.getDataSource(ENInterfaces.getImportErrros);
      this.closeTabService.saveDataForImportErrors = this.dataSource;
    }
    this.insertSelectedColumns();
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }

}
