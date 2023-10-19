import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { ToolsService } from 'services/tools.service';
import { UtilsService } from 'services/utils.service';
import { FactoryONE } from 'src/app/classes/factory';


@Component({
  selector: 'app-download-img-file',
  templateUrl: './download-img-file.component.html',
  styleUrls: ['./download-img-file.component.scss']
})
export class DownloadImgFileComponent extends FactoryONE {
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    private utilsService: UtilsService,
    public toolsService: ToolsService
  ) {
    super();
  }

  classWrapper = async () => {
    this.zoneDictionary = await this.toolsService.dictionaryWrapperService.getZoneDictionary();
  }
  connectToServer = async () => {
    if (this.toolsService.validationDownloadAllImages(this.toolsService.fileDownloadAllImages)) {
      window.open(this.utilsService.getAPIUrl() + '/' + ENInterfaces.downloadFileAllImages + this.utilsService.compositeService.getAccessToken() + '&zoneId=' + this.toolsService.fileDownloadAllImages.zoneId + '&day=' + this.toolsService.fileDownloadAllImages.day, ENInterfaces._blank);
    }
  }

}