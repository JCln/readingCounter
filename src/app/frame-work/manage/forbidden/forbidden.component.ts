import { Component } from '@angular/core';
import { IForbiddenManager } from 'interfaces/imanage';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { ForbiddenService } from 'services/forbidden.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent extends FactoryONE {
  dataSource: IForbiddenManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  userCounterReaders: IDictionaryManager[] = [];

  _years: ITitleValue[] = [];
  subscription: Subscription[] = [];

  constructor(
    public forbiddenService: ForbiddenService,
    private closeTabService: CloseTabService,
  ) {
    super();
    this.classWrapper();
  }
  makeConfigs = async () => {
    this.forbiddenService.setDynamicPartRanges(this.dataSource);

    this.zoneDictionary = await this.forbiddenService.getZoneDictionary();
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
  }
  connectToServer = async () => {
    this.dataSource = await this.forbiddenService.getDataSource();
    this.closeTabService.saveDataForFNB = this.dataSource;
    this.makeConfigs();
  }
  classWrapper = async () => {
    if (this.closeTabService.saveDataForFNB) {
      this.dataSource = this.closeTabService.saveDataForFNB;
      this.makeConfigs();
    }
    this.zoneDictionary = await this.forbiddenService.getZoneDictionary();
    this._years = this.forbiddenService.getYears();
  }
  verification = async () => {
    const temp = this.forbiddenService.verificationForbidden(this.forbiddenService.forbiddenReq);
    if (temp)
      this.connectToServer();
  }
  backToPrevious = () => {
    this.forbiddenService.backToParent();
  }
  showPictures = (forbiddenId: string) => {
    this.forbiddenService.routeToWOUI(forbiddenId, true);
  }
  ngOnInit(): void { return; }
  refreshTable = () => {
    this.verification();
  }

}