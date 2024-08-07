import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { ProfileService } from 'services/profile.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-water-mark',
  templateUrl: './water-mark.component.html',
  styleUrls: ['./water-mark.component.scss']
})
export class WaterMarkComponent extends FactoryONE {
  rgba: number[] = [255, 255, 255, 1];

  constructor(
    private profileService: ProfileService,
    public closeTabService: CloseTabService
  ) {
    super()
  }
  changeTextColorByServerRes = () => {
    this.rgba[0] = this.closeTabService.saveDataForWaterMark.r;
    this.rgba[1] = this.closeTabService.saveDataForWaterMark.g;
    this.rgba[2] = this.closeTabService.saveDataForWaterMark.b;
    this.rgba[3] = this.closeTabService.saveDataForWaterMark.a;

    this.textColorState();
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForWaterMark.r = this.rgba[0];
    this.closeTabService.saveDataForWaterMark.g = this.rgba[1];
    this.closeTabService.saveDataForWaterMark.b = this.rgba[2];
    this.closeTabService.saveDataForWaterMark.a = this.rgba[3];
    const response = await this.profileService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.postWaterMarkConfig, this.closeTabService.saveDataForWaterMark);
    if (response) {//Hard Coded!
      this.closeTabService.saveDataForWaterMark = response.targetObject;
      this.profileService.showMessage(response.message);
    }
  }
  classWrapper = async (canRefresh?: boolean) => {
    // if (MathS.isNull(this.closeTabService.saveDataForWaterMark.id)) {
    this.closeTabService.saveDataForWaterMark = await this.profileService.ajaxReqWrapperService.getDataSource(ENInterfaces.getWaterMarkConfig);
    this.changeTextColorByServerRes();
    // }

  }
  changeXPosition = (val: any) => {
    document.querySelector('p').style.left = (val / 5).toString() + 'px';
  }
  changeYPosition = (val: any) => {
    document.querySelector('p').style.top = (val / 5).toString() + 'px';
  }
  changeFontSize = (val: any) => {
    document.querySelector('p').style.fontSize = val.toString() + 'px';
  }
  textColorState = () => {
    const waterMarkColor = `rgba(${this.rgba.toString()})`
    document.getElementById('text-color').style.color = waterMarkColor;
  }

}
