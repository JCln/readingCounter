import { Component, OnInit } from '@angular/core';
import { IDictionaryManager, ITHV } from 'interfaces/ioverall-config';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImportDynamicService } from 'services/import-dynamic.service';

@Component({
  selector: 'app-assesspre-dg',
  templateUrl: './assesspre-dg.component.html',
  styleUrls: ['./assesspre-dg.component.scss']
})
export class AssesspreDgComponent implements OnInit {
  zoneDictionary: IDictionaryManager[] = [];
  counterStateByZoneIdDictionary: IDictionaryManager[] = [];
  counterReportDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  masrafState: ITHV[] = []

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public importDynamicService: ImportDynamicService
  ) {
  }
  classWrapper = async () => {
    this.zoneDictionary = await this.importDynamicService.getZoneDictionary();
    this.masrafState = this.importDynamicService.getMasrafStates();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  getMasterInZone = async () => {
    console.log(this.importDynamicService.AssessPreReq.zoneId);
    if (!this.importDynamicService.AssessPreReq.zoneId)
      return;

    this.counterReportDictionary = await this.importDynamicService.getCounterReportByZoneDictionary(this.importDynamicService.AssessPreReq.zoneId);
    this.karbariDictionary = await this.importDynamicService.getKarbariDictionary();
    this.counterStateByZoneIdDictionary = await this.importDynamicService.getCounterStateByZoneDictionary(this.importDynamicService.AssessPreReq.zoneId);
  }
  editCloseData() {
    if (this.importDynamicService.verificationAssessPre(this.importDynamicService.AssessPreReq))
      this.ref.close(this.importDynamicService.AssessPreReq);
  }
}
