import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ENGroupByNames, ENSelectedColumnVariables } from 'interfaces/enums.enum';
import { PrimeNGConfig, SortEvent } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { BrowserStorageService } from 'services/browser-storage.service';
import { InteractionService } from 'services/interaction.service';
import { OutputManagerService } from 'services/output-manager.service';
import { ProfileService } from 'services/profile.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { UtilsService } from 'services/utils.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { FactorySharedPrime } from 'src/app/classes/factory';


@Component({
  selector: 'app-prime-table',
  templateUrl: './prime-table.component.html',
  styleUrls: ['./prime-table.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush // commented => cause sideEffect to dictionary Wrapper response when data need to change after converted dictionary
})
export class PrimeTableComponent extends FactorySharedPrime {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
  previousAggregate: string;
  hasFiltersInTable: boolean = false;
  _groupByOptions: any[];

  @ViewChild(Table) datatableG: Table;
  @Input() _sortOrder: number = 1;
  @Input() _sortMode: string = 'single';
  @Input() _isSortable: boolean = true;
  @Input() _localGeneralSearch: boolean = true;
  @Input() _localHasFilter: boolean = true;
  @Input() _hasCollapsible: boolean = false;
  @Input() _isCollaped: boolean = false;
  @Input() _calculableSUM: boolean = false;
  @Input() _hasAggregating: boolean = false;
  @Input() _selectedAggregatedName: ENGroupByNames = ENGroupByNames.selectedAggregate;

  @Output() customedSort = new EventEmitter<any>();
  @Output() filteredEvent = new EventEmitter<any>();
  @Output() collapsed = new EventEmitter<any>();
  @Output() removedRow = new EventEmitter<any>();
  @Output() openedEditDialog = new EventEmitter<any>();
  @Output() openedMoshtarakinDialog = new EventEmitter<any>();
  @Output() refreshedTable = new EventEmitter<boolean>();
  @Output() forcedOffload = new EventEmitter<any>();
  @Output() backedToImportedConfirmDialog = new EventEmitter<any>();
  @Output() routedToLMPayDay = new EventEmitter<any>();
  @Output() openedBriefKardexDialog = new EventEmitter<any>();
  @Output() routedToLMAll = new EventEmitter<any>();
  @Output() routedToFollowUp = new EventEmitter<any>();
  @Output() showedMoreDetails = new EventEmitter<any>();
  @Output() firstConfirmedDialog = new EventEmitter<any>();
  @Output() showedInMap = new EventEmitter<any>();
  @Output() showedInMapSingle = new EventEmitter<any>();
  @Output() downloadedOutputSingle = new EventEmitter<any>();
  @Output() routeedToOffloadModify = new EventEmitter<any>();
  @Output() routedToOffloadGeneralModify = new EventEmitter<any>();
  @Output() backedToPrevious = new EventEmitter<any>();
  @Output() downloadedAPK = new EventEmitter<any>();
  @Output() clickedElmah = new EventEmitter<any>();
  @Output() showedPictures = new EventEmitter<any>();
  @Output() routedToOffload = new EventEmitter<any>();
  @Output() openedAddDialog = new EventEmitter<any>();
  @Output() routedToEditPage = new EventEmitter<any>();
  @Output() routedToLoggs = new EventEmitter<any>();
  @Output() showedExactConfig = new EventEmitter<any>();
  @Output() toPredStatus = new EventEmitter<any>();
  @Output() routedToSingle = new EventEmitter<any>();
  @Output() routedToBatch = new EventEmitter<any>();
  @Output() downloadedExcel = new EventEmitter<any>();

  constructor(
    public outputManagerService: OutputManagerService,
    public browserStorageService: BrowserStorageService,
    public columnManager: ColumnManager,
    public utilsService: UtilsService,
    public config: PrimeNGConfig,
    public dialogService: DialogService,
    public readingReportManagerService: ReadingReportManagerService,
    public profileService: ProfileService,
    public interactionService: InteractionService,
  ) {
    super(
      browserStorageService,
      utilsService,
      columnManager,
      config,
      dialogService,
      profileService,
      interactionService
    );
  }
  makeCapsulateGroupBy = () => {
    this._groupByOptions = JSON.parse(JSON.stringify(this._selectedColumns));
  }

  ngOnChanges(): void {
    if (this.dataSource) {
      this.restoreLatestColumnChanges();
      this.hasBeenReadsToggler();
      this.canShowPaginator();
      this.makeCapsulateGroupBy();
    }
  }
  refreshTable() {
    this.refreshedTable.emit(true);
  }
  filterEventTable(e: Table) {
    this.filteredEvent.emit(e.filteredValue);
    this.hasFilters(e);
  }
  forceOffload = (dataSource: object) => {
    this.forcedOffload.emit(dataSource);
  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }
  backToImportedConfirmDialog = (dataSource: object) => {
    this.backedToImportedConfirmDialog.emit(dataSource);
  }
  routeToLMPayDay = (dataSource: object) => {
    this.routedToLMPayDay.emit(dataSource);
  }
  openBriefKardexDialog = (dataSource: object) => {
    this.openedBriefKardexDialog.emit(dataSource);
  }
  routeToLMAll = (dataSource: object) => {
    this.routedToLMAll.emit(dataSource);
  }
  routeToFollowUp = (dataSource: object) => {
    this.routedToFollowUp.emit(dataSource);
  }
  showMoreDetails = (dataSource: object) => {
    this.showedMoreDetails.emit(dataSource);
  }
  firstConfirmDialog = (dataSource: object, ri: number) => {
    this.firstConfirmedDialog.emit({ dataSource, ri });
  }
  showInMap = (trackNumber, insertDateJalali) => {
    this.showedInMap.emit({ trackNumber, insertDateJalali });
  }
  showInMapSingle = (dataSource: object) => {
    this.showedInMapSingle.emit(dataSource);
  }
  downloadExcel = (dataSource: object) => {
    this.downloadedExcel.emit(dataSource);
  }
  downloadOutputSingle = (dataSource: object) => {
    this.downloadedOutputSingle.emit(dataSource);
  }
  routeToOffloadModify = (dataSource: object) => {
    this.routeedToOffloadModify.emit(dataSource);
  }
  routeToOffloadGeneralModify = (dataSource: object) => {
    this.routedToOffloadGeneralModify.emit(dataSource);
  }
  backToPrevious = () => {
    this.backedToPrevious.emit(true);
  }
  downloadAPK = () => {
    this.downloadedAPK.emit();
  }
  connectToElmah = (dataSource: string) => {
    this.clickedElmah.emit(dataSource);
  }
  showPictures = ($event) => {
    this.showedPictures.emit($event);
  }
  routeToOffload = (dataSource: object, ri: number) => {
    this.routedToOffload.emit({ dataSource, ri });
  }
  openAddDialog = () => {
    this.openedAddDialog.emit();
  }
  routeToEditPage = (dataSource: object) => {
    this.routedToEditPage.emit(dataSource);
  }
  routeToLoggs = (dataSource: object) => {
    this.routedToLoggs.emit(dataSource);
  }
  showExactConfig = (dataSource: object) => {
    this.showedExactConfig.emit(dataSource);
  }
  toPreStatus = (val: any) => {
    this.toPredStatus.emit(val);
  }
  removeRow = (dataSource: object, ri: number) => {
    this.removedRow.emit({ dataSource, ri });
  }
  collapse = () => {
    this.collapsed.emit();
  }
  openEditDialog = (dataSource: object) => {
    this.openedEditDialog.emit(dataSource);
  }
  openMoshtarakinDialog = (dataSource: object) => {
    this.openedMoshtarakinDialog.emit(dataSource);
  }
  routeToBatch = (dataSource: object) => {
    this.routedToBatch.emit(dataSource);
  }
  routeToSingle = (dataSource: object) => {
    this.routedToSingle.emit(dataSource);
  }
  getPerfectDataSource = (dataSource: any): any => {
    if (!!dataSource.filteredValue) { // there is sth to filter && dataSource is exsiting
      return dataSource.filteredValue;
    }
    else {
      return dataSource._value;
    }
  }
  calcSums(dataSource: any, param: string): number {
    let average = this.getPerfectDataSource(dataSource);
    if (average) {
      let total: number = 0;
      for (let index = 0; index < average.length; index++) {
        total += average[index][param] ? average[index][param] : 0;
      }
      return total;
    }
  }
  clearFilters(session: Table) {
    this.utilsService.clearFilters(session);
    this.hasFiltersInTable = false;
  }
  hasFilters = (datatableG: Table) => {
    this.hasFiltersInTable = this.utilsService.hasFilters(datatableG);
  }
  // groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  //   arr.reduce((groups, item) => {
  //     (groups[key(item)] ||= []).push(item);
  //     return groups;
  //   }, {} as Record<K, T[]>);
  doCustomSort = (event: any) => {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }
  changedAggregatedOption = () => {
    if (this.previousAggregate.length == 0)
      this.refreshAggregatedTable();
  }
  previousAggregatedOption = () => {
    this.previousAggregate = this.profileService._agg[this._selectedAggregatedName];
  }
  canShowPaginator = () => {
    /*// Kartables mean aggregatable tables */
    if (this._hasAggregating) {
      this._paginator = this.profileService._agg[this._selectedAggregatedName] == '' || !this.profileService._agg.flag ? true : false;
    }
  }

}