import { Component, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IProvinceHierarchy } from 'interfaces/ioverall-config';
import { TreeSelect } from 'primeng/treeselect';
import { CloseTabService } from 'services/close-tab.service';
import { ForbiddenService } from 'services/forbidden.service';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss'],
  animations: [transitionAnimation]
})
export class ForbiddenComponent extends FactoryONE {
  provinceHierarchy: IProvinceHierarchy[] = [];
  @ViewChild('myTreeSelect', { static: false }) myTreeSelect!: TreeSelect;
  selectedZoneIds = [];

  constructor(
    public forbiddenService: ForbiddenService,
    public closeTabService: CloseTabService,
  ) {
    super();
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForFNB = await this.forbiddenService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.forbidden, this.closeTabService.forbiddenReq);
    this.forbiddenService.setDynamicPartRanges(this.closeTabService.saveDataForFNB);
  }
  classWrapper = async () => {
    this.provinceHierarchy = await this.forbiddenService.dictionaryWrapperService.getProvinceHierarchy();
  }
  verification = async () => {
    this.closeTabService.forbiddenReq.zoneIds = this.forbiddenService.utilsService.getZoneHieraricalWithoutZoneCheck(this.myTreeSelect.value);
    const temp = this.forbiddenService.verificationService.verificationDates(this.closeTabService.forbiddenReq);
    if (temp)
      this.connectToServer();
  }

}