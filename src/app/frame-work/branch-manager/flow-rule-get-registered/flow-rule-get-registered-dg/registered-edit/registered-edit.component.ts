import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENCompanyName, ENRandomNumbers } from 'interfaces/enums.enum';
import { IDictionaryManager, IObjectIteratation } from 'interfaces/ioverall-config';
import { EN_Routes } from 'interfaces/routes.enum';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { EnvService } from 'services/env.service';
import { MapService } from 'services/map.service';
import { MathS } from 'src/app/classes/math-s';

declare let L;

@Component({
  selector: 'app-registered-edit',
  templateUrl: './registered-edit.component.html',
  styleUrls: ['./registered-edit.component.scss']
})
export class RegisteredEditComponent implements OnInit {
  submitted: boolean = false;
  zoneDictionary: [];
  siphonDictionary: any[] = [];
  usageDictionary: [];
  branchDiameterDictionary: [];
  guildDictionary: [];
  ownershipTypeDictionary: [];
  branchStateDictionary: [];
  waterSourceDictionary: [];
  customerTypeDictionary: [];
  offeringGroupDictionary: any[] = [];
  regionsByProvinceIdDictionary: IDictionaryManager[] = [];
  zonesByRegionIdDictionary: IDictionaryManager[] = [];
  villagesByZoneIdDictionary: IDictionaryManager[] = [];
  provinceDictionary: IDictionaryManager[] = [];

  private map4: L.Map;
  private layerGroup3 = new L.FeatureGroup();
  _selectedDatas: IObjectIteratation[] = [];
  private readonly _outputFileName: string = 'flowRuleGetRegisteredStepperEditColumns';

  constructor(
    public branchesService: BranchesService,
    public closeTabService: CloseTabService,
    public envService: EnvService,
    public mapService: MapService
  ) {
  }
  callAPI = async () => {
    if (this.branchesService.verificationService.requestDraftAdd(this.closeTabService.flowRuleRegisteredEdit)) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.requestDraftEdit, this.closeTabService.flowRuleRegisteredEdit);
      if (res) {
        this.closeTabService.flowRuleRegister.requestDraftId = res.targetObject.id;
        this.branchesService.utilsService.snackBarMessageSuccess(res.message);
        this.branchesService.utilsService.routeTo(EN_Routes.flowRuleGetRegisteredStepCalculated);
      }
    }
  }
  dictionaryWrapper = async () => {
    this.provinceDictionary = await this.branchesService.dictionaryWrapperService.getProvinceDictionary();
    this.offeringGroupDictionary = await this.branchesService.dictionaryWrapperService.getOfferingGroup(false);
    this.siphonDictionary = await this.branchesService.dictionaryWrapperService.getSiphonDictionary(false);
    this.zoneDictionary = await this.branchesService.dictionaryWrapperService.getZoneDictionary();
    this.usageDictionary = await this.branchesService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.branchDiameterDictionary = await this.branchesService.dictionaryWrapperService.getQotrDictionary();
    this.guildDictionary = await this.branchesService.dictionaryWrapperService.getGuildDictionary(false);
    this.ownershipTypeDictionary = await this.branchesService.dictionaryWrapperService.getOwnershipTypeDictionary(false);
    this.branchStateDictionary = await this.branchesService.dictionaryWrapperService.getBranchStateDictionary(false);
    this.waterSourceDictionary = await this.branchesService.dictionaryWrapperService.getWaterSourceDictionary(false);
    this.customerTypeDictionary = await this.branchesService.dictionaryWrapperService.getCustomerTypeDictionary(false);
  }
  classWrapper = async () => {
    this.dictionaryWrapper();
    console.log(this.closeTabService.flowRuleRegisteredEdit.offeringGroupIds);

    if (this.closeTabService.flowRuleRegisteredEdit.offeringGroupIds) {
      this.closeTabService.flowRuleRegister.offeringGroupIds = this.closeTabService.flowRuleRegisteredEdit.offeringGroupIds;
    }
    this._selectedDatas = this.branchesService.columnManager.getColumnsMenus(this._outputFileName);
    this.getRegionsByProvinceId();
    this.getZonesByRegionId();
    this.getVillagesByZoneId();
    this.initMapMarkerExisted();
  }
  async showInMap() {
    const res = await this.branchesService.openMapDialog(this.closeTabService.flowRuleRegisteredEdit, true);
    this.closeTabService.flowRuleRegisteredEdit.x = res.x;
    this.closeTabService.flowRuleRegisteredEdit.y = res.y;
  }
  private flyToDes = (lat: number, lag: number, zoom: number) => {
    if (lat === 0 || lag === 0)
      return;
    lat = parseFloat(lat.toString().substring(0, 6));
    lag = parseFloat(lag.toString().substring(0, 6));

    this.map4.flyTo([(lat), (lag)], zoom);
  }
  initMapMarkerExisted = () => {
    this.map4 = L.map('map4', {
      center: this.envService.mapCenter,
      zoom: ENRandomNumbers.fifteen,
      minZoom: ENRandomNumbers.four,
      maxZoom: ENRandomNumbers.eighteen,
      layers: [this.mapService.getFirstItemUrl(), this.layerGroup3]
    });

    this.map4.attributionControl.setPrefix(ENCompanyName.title);
    const x = Number(this.closeTabService.flowRuleRegisteredEdit.x);
    const y = Number(this.closeTabService.flowRuleRegisteredEdit.y);
    var markersGroup = L.layerGroup();
    this.flyToDes(x, y, ENRandomNumbers.fifteen);
    L.marker([x, y]).addTo(markersGroup);
    this.map4.addLayer(markersGroup);
  }

  async getRegionsByProvinceId() {
    if (this.closeTabService.flowRuleRegisteredEdit.provinceId)
      this.regionsByProvinceIdDictionary = await this.branchesService.dictionaryWrapperService.getRegionDictionaryByProvinceId(this.closeTabService.flowRuleRegisteredEdit.provinceId);
  }
  async getZonesByRegionId() {
    if (this.closeTabService.flowRuleRegisteredEdit.regionId)
      this.zonesByRegionIdDictionary = await this.branchesService.dictionaryWrapperService.getZonesByRegionIdDictionary(this.closeTabService.flowRuleRegisteredEdit.regionId);
  }
  async getVillagesByZoneId() {
    if (this.closeTabService.flowRuleRegisteredEdit.zoneId)
      this.villagesByZoneIdDictionary = await this.branchesService.dictionaryWrapperService.getVillageDictionaryByZoneId(this.closeTabService.flowRuleRegisteredEdit.zoneId);
  }
  ngOnInit(): void {
    if (MathS.isNull(this.closeTabService.flowRuleRegisteredEdit)) {
      // backto previous page if there is no object(data)
      this.branchesService.utilsService.routeTo(EN_Routes.flowRuleGetRegisteredLazy);
      return;
    }
    this.classWrapper();
  }
  async addTag() {
    const confirmed = await this.branchesService.utilsService.showTagDialog();
    console.log(confirmed);
  }
  nextPage() {
    if (this.branchesService.verificationService.requestDraftAdd(this.closeTabService.flowRuleRegisteredEdit)) {
      this.closeTabService.utilsService.routeToByUrl(EN_Routes.flowRuleGetRegisteredStepCalc);
    } else {
      this.submitted = true;
    }
  }

}
