import { Component, Input } from '@angular/core';
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
  isCollapsed: boolean = false;
  panelOpenState: boolean = true;
  dataSource: any;
  zoneDictionary: IDictionaryManager[] = [];
  userCounterReaders: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

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

    if (this.dataSource.length)
      this.insertSelectedColumns();
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
    // this.userCounterReaders = await this.forbiddenService.getUserCounterReaders();
    // Converter.convertIdToTitle(this.dataSource, this.userCounterReaders, 'userId');
    this.zoneDictionary = await this.forbiddenService.getZoneDictionary();
    this._years = this.forbiddenService.getYears();
  }
  verification = async () => {
    const temp = this.forbiddenService.verificationForbidden(this.forbiddenService.forbiddenReq);
    if (temp)
      this.connectToServer();
  }
  private insertSelectedColumns = () => {
    this._selectCols = this.forbiddenService.columnSelectedMenuDefault();
    this._selectedColumns = this.forbiddenService.customizeSelectedColumns(this._selectCols);
  }
  backToPrevious = () => {
    this.forbiddenService.backToParent();
  }
  showPictures = (forbiddenId: string) => {
    this.forbiddenService.routeToWOUI(forbiddenId, true);
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  ngOnInit(): void { return; }
  refreshTable = () => {
    this.connectToServer();
  }

}