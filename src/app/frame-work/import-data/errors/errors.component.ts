import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IImportErrors } from 'interfaces/import-data';
import { CloseTabService } from 'services/close-tab.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent extends FactoryONE {
  dataSource: IImportErrors[] = [];

  constructor(
    private closeTabService: CloseTabService,
    private importDynamicService: ImportDynamicService,
  ) {
    super();
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

  }

}
