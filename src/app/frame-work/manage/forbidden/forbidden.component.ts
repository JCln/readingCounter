import { Component, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, IProvinceHierarchy } from 'interfaces/ioverall-config';
import { TreeSelect } from 'primeng/treeselect';
import { CloseTabService } from 'services/close-tab.service';
import { ForbiddenService } from 'services/forbidden.service';
import { Converter } from 'src/app/classes/converter';
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
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    public forbiddenService: ForbiddenService,
    public closeTabService: CloseTabService,
  ) {
    super();
  }
  insertToAuxZoneid = () => {
    this.closeTabService.saveDataForFNB.forEach(item => {
      item.changableZoneId = item.zoneId;
    })
  }
  doDictionaryConfigs = async () => {
    this.zoneDictionary = await this.forbiddenService.dictionaryWrapperService.getZoneDictionary();
    this.insertToAuxZoneid();
    Converter.convertIdToTitle(this.closeTabService.saveDataForFNB, this.zoneDictionary, 'changableZoneId');
  }

  connectToServer = async () => {
    this.closeTabService.saveDataForFNB = await this.forbiddenService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.forbidden, this.closeTabService.forbiddenReq);
    this.doDictionaryConfigs();
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