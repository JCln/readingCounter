import { UtilsService } from 'services/utils.service';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ToolsService } from 'services/tools.service';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-img-result-details-grid-based',
  templateUrl: './img-result-details-grid-based.component.html',
  styleUrls: ['./img-result-details-grid-based.component.scss'],
  animations: [transitionAnimation]
})
export class ImgResultDetailsGridBasedComponent extends FactoryONE {
  zoneDictionary: IDictionaryManager[] = [];
  imageAttrAllDictionary: IDictionaryManager[] = [];

  constructor(
    public closeTabService: CloseTabService,
    public toolsService: ToolsService,
    private utilsService: UtilsService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForImgResultDetailsGridBased = null;
  classWrapper = async (canRefresh?: boolean) => {
    this.imageAttrAllDictionary = await this.toolsService.dictionaryWrapperService.getImageAttrAllDictionary();
    this.zoneDictionary = await this.toolsService.dictionaryWrapperService.getZoneDictionary();

    if (canRefresh) {
      this.nullSavedSource();
      this.verification();
    }

  }
  connectToServer = async () => {
    this.closeTabService.saveDataForImgResultDetailsGridBased = await this.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.postImgAttrResultDetailsGridBased, this.toolsService.imgResultDetailsGridBased);
  }
  verification = () => {
    const temp = this.toolsService.verificationImageResultDetails(this.toolsService.imgResultDetailsGridBased);
    if (temp)
      this.connectToServer();
  }


}