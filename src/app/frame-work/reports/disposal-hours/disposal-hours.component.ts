import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IReadingReportReq } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { Subscription } from 'rxjs/internal/Subscription';
import { InteractionService } from 'services/interaction.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';


@Component({
  selector: 'app-disposal-hours',
  templateUrl: './disposal-hours.component.html',
  styleUrls: ['./disposal-hours.component.scss']
})
export class DisposalHoursComponent extends FactoryONE {
  readingReportReq: IReadingReportReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: 1400
  }
  _isOrderByDate: boolean = true;
  _selectedKindId: string = '';
  zoneDictionary: IDictionaryManager[] = [];
  subscription: Subscription[] = [];

  constructor(
    private readingReportManagerService: ReadingReportManagerService,
    public interactionService: InteractionService,
    public route: ActivatedRoute
  ) {
    super(interactionService);
  }

  classWrapper = async (canRefresh?: boolean) => {
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
  }
  ngOnInit() {
    this.classWrapper();
  }
  routeToGridView = () => {
    this.readingReportManagerService.routeTo('/wr/rpts/mam/dh/res');
  }
  routeToChartView = () => {
    this.readingReportManagerService.routeTo('/wr/rpts/mam/dh/chart');
  }
  receiveFromDateJalali = ($event: string) => {
    this.readingReportReq.fromDate = $event;
  }
  receiveToDateJalali = ($event: string) => {
    this.readingReportReq.toDate = $event;
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationRRDisposalHours(this.readingReportReq);
    if (temp)
      document.activeElement.id == 'grid_view' ? this.routeToGridView() : this.routeToChartView();
  }
}
