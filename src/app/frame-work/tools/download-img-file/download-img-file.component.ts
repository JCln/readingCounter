import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { EnvService } from 'services/env.service';
import { ToolsService } from 'services/tools.service';
import { JwtService } from 'src/app/auth/jwt.service';
import { FactoryONE } from 'src/app/classes/factory';


@Component({
  selector: 'app-download-img-file',
  templateUrl: './download-img-file.component.html',
  styleUrls: ['./download-img-file.component.scss']
})
export class DownloadImgFileComponent extends FactoryONE {
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    public toolsService: ToolsService,
    private envService: EnvService,
    private jwtService: JwtService
  ) {
    super();
  }

  classWrapper = async () => {
    this.zoneDictionary = await this.toolsService.getZoneDictionary();
  }
  connectToServer = async () => {
    if (this.toolsService.validationDownloadAllImages(this.toolsService.fileDownloadAllImages)) {
      window.open(this.envService.API_URL + '/' + ENInterfaces.downloadFileAllImages + this.jwtService.getAuthorizationToken() + '&zoneId=' + this.toolsService.fileDownloadAllImages.zoneId + '&day=' + this.toolsService.fileDownloadAllImages.day, '_blank');
    }
  }

}