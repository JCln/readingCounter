import { Component, OnInit } from '@angular/core';
import { IAssessPreDisplayDtoSimafa } from 'interfaces/imanage';
import { IDictionaryManager, ITHV } from 'interfaces/ioverall-config';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImportDynamicService } from 'services/import-dynamic.service';

@Component({
  selector: 'app-assesspre-dg',
  templateUrl: './assesspre-dg.component.html',
  styleUrls: ['./assesspre-dg.component.scss']
})
export class AssesspreDgComponent implements OnInit {
  AssessPreReq: IAssessPreDisplayDtoSimafa = {
    reportIds: [],
    counterStateIds: [],
    masrafStates: [],
    karbariCodes: [],
    zoneId: null,
    listNumber: ''
  }

  zoneDictionary: IDictionaryManager[] = [];
  counterStateByZoneIdDictionary: IDictionaryManager[] = [];
  counterReportDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  masrafState: ITHV[] = []

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private importDynamicService: ImportDynamicService
  ) {
  }
  classWrapper = async () => {
    if (this.AssessPreReq.listNumber = '') {
      this.AssessPreReq = this.importDynamicService.getAssessPre();
    }
    this.zoneDictionary = await this.importDynamicService.getZoneDictionary();
    this.masrafState = this.importDynamicService.getMasrafStates();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  getMasterInZone = async () => {
    console.log(this.AssessPreReq.zoneId);
    if (!this.AssessPreReq.zoneId)
      return;

    this.counterReportDictionary = await this.importDynamicService.getCounterReportByZoneDictionary(this.AssessPreReq.zoneId);
    this.karbariDictionary = await this.importDynamicService.getKarbariDictionary();
    this.counterStateByZoneIdDictionary = await this.importDynamicService.getCounterStateByZoneDictionary(this.AssessPreReq.zoneId);
  }
  editCloseData() {
    if (this.importDynamicService.verificationAssessPre(this.AssessPreReq))
      this.ref.close(this.AssessPreReq);
  }
}
