import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IReadingReportDetails, IReadingReportReq } from 'src/app/Interfaces/imanage';
import { IDictionaryManager, ISearchInOrderTo } from 'src/app/Interfaces/ioverall-config';
import { InteractionService } from 'src/app/services/interaction.service';
import { ReadingReportManagerService } from 'src/app/services/reading-report-manager.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  readingReportReq: IReadingReportReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: 0
  }
  searchInOrderTo: ISearchInOrderTo[] = [
    {
      title: 'تاریخ',
      isSelected: true
    },
    {
      title: 'دوره',
      isSelected: false
    }
  ]
  _isOrderByDate: boolean = false;
  _selectedKindId: string = '';
  zoneDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  readingReportMaster: IReadingReportDetails[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  subscription: Subscription[] = [];

  constructor(
    private readingReportManagerService: ReadingReportManagerService,
    private interactionService: InteractionService,
    public route: ActivatedRoute
  ) { }

  classWrapper = async () => {
    this.readingPeriodKindDictionary = await this.readingReportManagerService.getReadingPeriodKindDictionary();
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/rpts/exm/details') {
          this.classWrapper();
        }
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  connectToServer = async () => {
    this.readingReportMaster = await this.readingReportManagerService.postRRDetailsManager();
    if (!this.readingReportMaster.length) {
      this.readingReportManagerService.emptyMessage();
      return;
    }
    this.karbariDictionary = await this.readingReportManagerService.getKarbariDictionary();
  }
  receiveFromDateJalali = ($event: string) => {
    this.readingReportReq.fromDate = $event;
  }
  receiveToDateJalali = ($event: string) => {
    this.readingReportReq.toDate = $event;
  }
  receiveYear = ($event: string) => {
    this.readingReportReq.year = parseInt($event.substring(0, 4));
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.getReadingPeriodDictionary(this._selectedKindId);
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationRRDetails(this.readingReportReq, this._isOrderByDate);
    if (temp)
      this.connectToServer();
  }
}
