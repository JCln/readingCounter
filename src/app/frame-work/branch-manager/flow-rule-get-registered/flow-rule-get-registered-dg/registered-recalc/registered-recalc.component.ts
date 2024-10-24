import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENRandomNumbers, ENCompanyName, EN_messages } from 'interfaces/enums.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import * as L from 'leaflet';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { EnvService } from 'services/env.service';
import { MapService } from 'services/map.service';
import { FactoryONE } from 'src/app/classes/factory';
import { ConfirmDgComponent } from '../../../request-draft/confirmation/confirm-dg/confirm-dg.component';

@Component({
  selector: 'app-registered-recalc',
  templateUrl: './registered-recalc.component.html',
  styleUrls: ['./registered-recalc.component.scss']
})
export class RegisteredRecalcComponent extends FactoryONE {
  private layerGroup3 = new L.FeatureGroup();
  private map3: L.Map;
  private readonly outputConfirmDialog: string = 'requestDraft_confirmDialog';
  qotrDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  usageDictionary: IDictionaryManager[] = [];
  branchDiameterDictionary: IDictionaryManager[] = [];
  guildDictionary: IDictionaryManager[] = [];
  ownershipTypeDictionary: IDictionaryManager[] = [];
  branchStateDictionary: IDictionaryManager[] = [];
  waterSourceDictionary: IDictionaryManager[] = [];
  customerTypeDictionary: IDictionaryManager[] = [];
  offeringGroupDictionary: any[] = [];

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService,
    private envService: EnvService,
    private mapService: MapService,
    public dialog: MatDialog,
  ) {
    super();
  }

  private getOverlays = () => {
    return {
      "لایه ها": this.layerGroup3
    };
  }
  private flyToDes = (lat: number, lag: number, zoom: number) => {
    if (lat === 0 || lag === 0)
      return;
    lat = parseFloat(lat.toString().substring(0, 6));
    lag = parseFloat(lag.toString().substring(0, 6));

    this.map3.flyTo([(lat), (lag)], zoom);
  }
  initMapMarkerExisted = () => {
    this.map3 = L.map('map3', {
      center: this.envService.mapCenter,
      zoom: ENRandomNumbers.fifteen,
      minZoom: ENRandomNumbers.four,
      maxZoom: ENRandomNumbers.eighteen,
      layers: [this.mapService.getFirstItemUrl(), this.layerGroup3]
    });

    this.map3.attributionControl.setPrefix(ENCompanyName.title);
    const x = Number(this.closeTabService.requestDraftReq.x);
    const y = Number(this.closeTabService.requestDraftReq.y);
    var markersGroup = L.layerGroup();
    this.flyToDes(x, y, ENRandomNumbers.fifteen);
    L.marker([x, y]).addTo(markersGroup);
    this.map3.addLayer(markersGroup);
  }
  classWrapper = async () => {
    this.dictionaryWrapper();
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
    this.offeringGroupDictionary = await this.branchesService.dictionaryWrapperService.getOfferingGroup(false);
  }
  showResDialog = (res: any, disableClose: boolean, title: string): Promise<any> => {
    // disable close mean when dynamic count show decision should make
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(ConfirmDgComponent,
        {
          disableClose: disableClose,
          minWidth: '21rem',
          data: {
            data: res,
            outputFileName: this.outputConfirmDialog,
            title: title,
            isConfirm: disableClose,
          }
        });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          resolve(true);
        }
      })
    });

  }
  callAPI = async () => {
    if (this.branchesService.verificationService.requestDraftAdd(this.closeTabService.requestDraftReq)) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.requestDraftAdd, this.closeTabService.requestDraftReq);
      const text = EN_messages.requestAddedSuccessfully;
      // if request repeated then same request call api should trigger
      if (await this.showResDialog(res, false, text)) {
        this.callAPI();
      }
      // this.closeTabService.calculationRequestDraft.requestDraftId = res.targetObject.id;

      // const config = {
      //   messageTitle: res.message,
      //   minWidth: '21rem',
      //   text: EN_messages.continueToCalculation,
      //   isInput: false,
      //   isImportant: false,
      //   icon: 'pi pi-check',
      //   closable: true,
      // }
      // const dialogRes = await this.branchesService.utilsService.primeConfirmDialog(config);
      // empty the previous calculation
      // this.closeTabService.requestDraftCalculationRes = [];

      // if (!!dialogRes || !dialogRes) {
      //   this.branchesService.utilsService.routeTo(EN_Routes.requestDraftCalculation);
      // }
    }
  }
}
