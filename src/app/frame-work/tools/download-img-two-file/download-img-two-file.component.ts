import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ToolsService } from 'services/tools.service';
import { UtilsService } from 'services/utils.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-download-img-two-file',
  templateUrl: './download-img-two-file.component.html',
  styleUrls: ['./download-img-two-file.component.scss']
})
export class DownloadImgTwoFileComponent extends FactoryONE {
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    public toolsService: ToolsService,
    private utilsService: UtilsService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async () => {
    this.zoneDictionary = await this.toolsService.dictionaryWrapperService.getZoneDictionary();
  }
  connectToServer = async () => {
    if (this.toolsService.verificationService.validationDownloadAllImagesTwo2(this.closeTabService.fileDownloadAllImagesTwo2)) {
      window.open(this.utilsService.getAPIUrl() + '/' + ENInterfaces.downloadFileAllImagesTWO + this.utilsService.compositeService.getAccessToken() + '&zoneId=' + this.closeTabService.fileDownloadAllImagesTwo2.zoneId + '&fromDay=' + this.closeTabService.fileDownloadAllImagesTwo2.fromDay + '&toDay=' + this.closeTabService.fileDownloadAllImagesTwo2.toDay, ENInterfaces._blank);
    }
  }

}