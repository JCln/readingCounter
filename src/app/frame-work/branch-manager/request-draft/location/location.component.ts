import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { EN_Routes } from 'interfaces/routes.enum';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent extends FactoryONE {
  private readonly _outputFileName: string = 'requestDraftLocation';
  provinceDictionary: IDictionaryManager[] = [];
  regionsByProvinceIdDictionary: IDictionaryManager[] = [];
  zonesByRegionIdDictionary: IDictionaryManager[] = [];
  villagesByZoneIdDictionary: IDictionaryManager[] = [];
  submitted: boolean = false;
  _selectCols: any = [];

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService
  ) {
    super();
  }

  insertSelectedColumns = () => {
    this._selectCols = this.branchesService.columnManager.getColumnsMenus(this._outputFileName);
  }
  classWrapper = async () => {
    this.provinceDictionary = await this.branchesService.dictionaryWrapperService.getProvinceDictionary();
    this.insertSelectedColumns();
  }
  async showInMap() {
    const res = await this.branchesService.openMapDialog([], true);
    this.closeTabService.requestDraftReq.x = res.x;
    this.closeTabService.requestDraftReq.y = res.y;
  }
  async getRegionsByProvinceId() {
    if (this.closeTabService.requestDraftReq.provinceId)
      this.regionsByProvinceIdDictionary = await this.branchesService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.RegionDictionaryByProvinceId, this.closeTabService.requestDraftReq.provinceId);
  }
  async getZonesByRegionId() {
    if (this.closeTabService.requestDraftReq.regionId)
      this.zonesByRegionIdDictionary = await this.branchesService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.ZoneDictionaryByRegionId, this.closeTabService.requestDraftReq.regionId);
  }
  async getVillagesByZoneId() {
    if (this.closeTabService.requestDraftReq.zoneId)
      this.villagesByZoneIdDictionary = await this.branchesService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.villagesByZoneId, this.closeTabService.requestDraftReq.zoneId);
  }
  nextPage() {
    if (this.branchesService.verificationService.requestDraftLocation(this.closeTabService.requestDraftReq)) {
      this.closeTabService.utilsService.routeToByUrl(EN_Routes.requestDraftConfirmation);
    } else {
      this.submitted = true;
    }
  }

}
