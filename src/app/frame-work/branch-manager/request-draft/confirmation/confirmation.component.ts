import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENRandomNumbers, EN_messages } from 'interfaces/enums.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { EN_Routes } from 'interfaces/routes.enum';
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
  private readonly _outputFileName: string = 'requestDraftAdd';
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
  private getOverlays = () => {
    return {
      "لایه ها": this.layerGroup3
    };
  }
  initMapMarkerExisted = () => {
    this.map3 = L.map('map3', {
      center: this.envService.mapCenter,
      zoom: ENRandomNumbers.fifteen,
      minZoom: ENRandomNumbers.four,
      maxZoom: ENRandomNumbers.eighteen,
      layers: [this.mapService.getFirstItemUrl(), this.layerGroup3]
    });
    L.control.layers(this.mapService.getBaseMap(), this.getOverlays()).addTo(this.map3);
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
    console.log(this.closeTabService.requestDraftReq);

    if (this.branchesService.verificationService.requestDraftAdd(this.closeTabService.requestDraftReq)) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.requestDraftAdd, this.closeTabService.requestDraftReq);
      console.log(res);
      this.closeTabService.calculationRequestDraft.requestDraftId = res.id;
      const config = {
        messageTitle: res.message,
        minWidth: '21rem',
        text: EN_messages.continueToCalculation,
        isInput: false,
        isImportant: false,
        icon: 'pi pi-check',
        closable: true,
      }
      const dialogRes = await this.branchesService.utilsService.primeConfirmDialog(config);
      console.log(dialogRes);

      if (!!dialogRes || !dialogRes) {
        this.branchesService.utilsService.routeTo(EN_Routes.requestDraftCalculation);
      }
    }
  }
}
