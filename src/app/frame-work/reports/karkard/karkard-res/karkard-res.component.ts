import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { OutputManagerService } from 'services/output-manager.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { UtilsService } from 'services/utils.service';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { IReadingReportKarkard } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';

@Component({
  selector: 'app-karkard-res',
  templateUrl: './karkard-res.component.html',
  styleUrls: ['./karkard-res.component.scss']
})
export class KarkardResComponent implements OnInit, OnDestroy {
  dataSource: IReadingReportKarkard[] = [];

  subscription: Subscription[] = [];
  karbariDictionary: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public outputManagerService: OutputManagerService,
    private utilsService: UtilsService
  ) {
  }
  insertSelectedColumns = () => {
    this._selectCols = this.readingReportManagerService.columnRRKarkard();
    this._selectedColumns = this.readingReportManagerService.customizeSelectedColumns(this._selectCols);
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.postRRManager('wr/rpts/mam/karkard', ENInterfaces.ListOFFKarkard, 'readingReportReq');
    if (this.utilsService.isNull(this.dataSource))
      return;
    this.karbariDictionary = await this.readingReportManagerService.getKarbariDictionary();
    this.outputManagerService.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.connectToServer();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  refreshTable = () => {
    this.ngOnInit();
  }
  backToPrevious = () => {
    this.readingReportManagerService.backToPreviousPage();
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }

}
