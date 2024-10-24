import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENRandomNumbers } from 'interfaces/enums.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { EnvService } from 'services/env.service';
import { MapService } from 'services/map.service';
import { FactoryONE } from 'src/app/classes/factory';

declare let L;
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent extends FactoryONE {
  private readonly _outputFileName: string = 'clientManagerAdd';
  private readonly _outputFileNameAccordion: string = '';
  private layerGroup3 = new L.FeatureGroup();
  private map3: L.Map;

  qotrDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  usageDictionary: IDictionaryManager[] = [];
  branchDiameterDictionary: IDictionaryManager[] = [];
  guildDictionary: IDictionaryManager[] = [];
  ownershipTypeDictionary: IDictionaryManager[] = [];
  branchStateDictionary: IDictionaryManager[] = [];
  waterSourceDictionary: IDictionaryManager[] = [];
  customerTypeDictionary: IDictionaryManager[] = [];

  _selectCols: any = [];
  _selectColsAccordion: any = [];

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService,
    private envService: EnvService,
    private mapService: MapService
  ) {
    super();
  }

  insertSelectedColumns = () => {
    this._selectCols = this.branchesService.columnManager.getColumnsMenus(this._outputFileName);
    this._selectColsAccordion = this.branchesService.columnManager.getColumnsMenus(this._outputFileNameAccordion);
  }
  initMapMarkerExisted = () => {
    this.map3 = L.map('map3', {
      center: this.envService.mapCenter,
      zoom: ENRandomNumbers.fifteen,
      minZoom: ENRandomNumbers.four,
      maxZoom: ENRandomNumbers.eighteen,
      layers: [this.mapService.getFirstItemUrl(), this.layerGroup3]
    });
  }
  classWrapper = async () => {
    this.insertSelectedColumns();
    this.initMapMarkerExisted();
  }
  dictionaryWrapper = async () => {
    this.zoneDictionary = await this.branchesService.dictionaryWrapperService.getZoneDictionary();
    this.usageDictionary = await this.branchesService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.branchDiameterDictionary = await this.branchesService.dictionaryWrapperService.getQotrDictionary();
    this.guildDictionary = await this.branchesService.dictionaryWrapperService.getGuildDictionary(false);
    this.ownershipTypeDictionary = await this.branchesService.dictionaryWrapperService.getOwnershipTypeDictionary(false);
    this.branchStateDictionary = await this.branchesService.dictionaryWrapperService.getBranchStateDictionary(false);
    this.waterSourceDictionary = await this.branchesService.dictionaryWrapperService.getWaterSourceDictionary(false);
    this.customerTypeDictionary = await this.branchesService.dictionaryWrapperService.getCustomerTypeDictionary(false);
  }
  callAPI = async () => {
    if (this.branchesService.verificationService.clientAdd(this.closeTabService.clientAddReq)) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.clientAdd, this.closeTabService.clientAddReq);
      const config = {
        messageTitle: res.message,
        minWidth: '21rem',
        isInput: false,
        isImportant: false,
        icon: 'pi pi-check',
        closable: true,
      }
      this.branchesService.utilsService.primeConfirmDialog(config);
    }
  }
}
