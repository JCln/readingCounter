import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
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
    private utilsService: UtilsService
  ) {
    super();
  }

  classWrapper = async () => {
    this.zoneDictionary = await this.toolsService.dictionaryWrapperService.getZoneDictionary();
  }
  connectToServer = async () => {
    if (this.toolsService.validationDownloadAllImagesTwo2(this.toolsService.fileDownloadAllImagesTwo2)) {
      window.open(this.utilsService.getAPIUrl() + '/' + ENInterfaces.downloadFileAllImagesTWO + this.utilsService.compositeService.getAccessToken() + '&zoneId=' + this.toolsService.fileDownloadAllImagesTwo2.zoneId + '&fromDay=' + this.toolsService.fileDownloadAllImagesTwo2.fromDay + '&toDay=' + this.toolsService.fileDownloadAllImagesTwo2.toDay, ENInterfaces._blank);
    }
  }

}