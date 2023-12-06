import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IReadingConfigDefault } from 'interfaces/iimports';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-imported-edited',
  templateUrl: './imported-edited.component.html',
  styleUrls: ['./imported-edited.component.scss'],
  animations: [transitionAnimation]
})
export class ImportedEditedComponent extends FactoryONE {
  zoneDictionary: IDictionaryManager[] = [];
  readingConfigDefault: IReadingConfigDefault;

  constructor(
    public trackingManagerService: TrackingManagerService,
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.importedEditedRes = [];
      this.verification();
    }
    this.zoneDictionary = await this.trackingManagerService.dictionaryWrapperService.getZoneDictionary();
    this.getReadingConfigDefaults();
  }
  connectToServer = async () => {
    this.closeTabService.importedEditedRes = await this.trackingManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.trackingGetImportedEdited, this.closeTabService.importedEditedReq);
  }
  verification = async () => {
    const temp = this.trackingManagerService.validationImportedEdited(this.closeTabService.importedEditedReq);
    if (temp)
      this.connectToServer();
  }
  getReadingConfigDefaults = async () => {
    if (this.closeTabService.importedEditedReq.zoneId) {
      this.readingConfigDefault = await this.trackingManagerService.dictionaryWrapperService.getReadingConfigDefaultByZoneIdDictionary(this.closeTabService.importedEditedReq.zoneId);
      this.closeTabService.importedEditedReq.hasPreNumber = this.readingConfigDefault.defaultHasPreNumber;
      this.closeTabService.importedEditedReq.displayBillId = this.readingConfigDefault.displayBillId;
      this.closeTabService.importedEditedReq.displayRadif = this.readingConfigDefault.displayRadif;
      this.closeTabService.importedEditedReq.imagePercent = this.readingConfigDefault.defaultImagePercent;
      this.closeTabService.importedEditedReq.alalHesabPercent = this.readingConfigDefault.defaultAlalHesab;
    }
  }

}
