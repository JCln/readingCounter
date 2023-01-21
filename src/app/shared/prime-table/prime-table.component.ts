import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ENSelectedColumnVariables } from 'interfaces/ioverall-config';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { BrowserStorageService } from 'services/browser-storage.service';
import { InteractionService } from 'services/interaction.service';
import { OutputManagerService } from 'services/output-manager.service';
import { UtilsService } from 'services/utils.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { FactorySharedPrime } from 'src/app/classes/factory';


@Component({
  selector: 'app-prime-table',
  templateUrl: './prime-table.component.html',
  styleUrls: ['./prime-table.component.scss']
})
export class PrimeTableComponent extends FactorySharedPrime {
  ENSelectedColumnVariables = ENSelectedColumnVariables;

  @Input() _sortOrder: number = -1;
  @Input() _sortMode: string = 'single';
  @Input() _isSortable: boolean = true;
  @Input() _hasCollapsible: boolean = false;
  @Input() _canShowButton: boolean = true;
  @Input() _isCollaped: boolean = false;
  @Input() _calculableSUM: boolean = false;
  @Input() _calcName: string = '';
  @Input() _hasAggregating: boolean = false;

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
  @Output() backedToReading = new EventEmitter<any>();
  @Output() backedToPrevious = new EventEmitter<any>();
  @Output() downloadedAPK = new EventEmitter<any>();
  @Output() clickedElmah = new EventEmitter<any>();
  @Output() registeredAssess = new EventEmitter<any>();
  @Output() showedPictures = new EventEmitter<any>();
  @Output() routedToOffload = new EventEmitter<any>();
  @Output() openedAddDialog = new EventEmitter<any>();
  @Output() routedToEditPage = new EventEmitter<any>();
  @Output() routedToLoggs = new EventEmitter<any>();
  @Output() showedExactConfig = new EventEmitter<any>();
  @Output() ActivatedUser = new EventEmitter<any>();
  @Output() DeActivatedUser = new EventEmitter<any>();
  @Output() resetedPasswordUser = new EventEmitter<any>();
  @Output() unlockedUser = new EventEmitter<any>();
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
    public interactionService: InteractionService
  ) {
    super(
      browserStorageService,
      utilsService,
      columnManager,
      config,
      dialogService
    );
  }

  refreshTable() {
    this.refreshedTable.emit(true);
  }
  filterEventTable(e: Table) {
    this.filteredEvent.emit(e.filteredValue);
  }
  forceOffload = (dataSource: object, ri: number) => {
    this.forcedOffload.emit({ dataSource, ri });
  }
  backToImportedConfirmDialog = (dataSource: object, ri: number) => {
    this.backedToImportedConfirmDialog.emit({ dataSource, ri });
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
  backToReading = (dataSource: object, ri: number) => {
    this.backedToReading.emit({ dataSource, ri });
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
  registerAssessAdd = () => {
    this.registeredAssess.emit();
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
  routeToEditPage = (dataSource: string) => {
    this.routedToEditPage.emit(dataSource);
  }
  routeToLoggs = (dataSource: object) => {
    this.routedToLoggs.emit(dataSource);
  }
  showExactConfig = (dataSource: number) => {
    this.showedExactConfig.emit(dataSource);
  }
  ActivateUser = (dataSource: object, ri: number) => {
    this.ActivatedUser.emit({ dataSource, ri });
  }
  DeActivateUser = (dataSource: object, ri: number) => {
    this.DeActivatedUser.emit({ dataSource, ri });
  }
  resetPasswordUser = (dataSource: object, ri: number) => {
    this.resetedPasswordUser.emit({ dataSource, ri });
  }
  unLockUser = (dataSource: object, ri: number) => {
    this.unlockedUser.emit({ dataSource, ri });
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
  customSort = (dataSource: any) => {
    this.customedSort.emit(dataSource);
  }
  routeToSingle = (dataSource: object) => {
    this.routedToSingle.emit(dataSource);
  }
  calcSums(): number {
    let total: number = 0;
    this.dataSource.map(item => {
      total += item[this._calcName]
    })
    return total;
  }
  // refreshTableAfterGrouping = () => {
  //   this.interactionService._agg.canShowGroupBorder = 2;
  //   setTimeout(() => {
  //     this.interactionService._agg.canShowGroupBorder = 1;
  //   }, 10);
  // }
  // updateRowGroupMetaData(toAggregate: string) {
  //   this.interactionService._agg.rowGroupMetadata = {};

  //   if (this.dataSource) {
  //     for (let i = 0; i < this.dataSource.length; i++) {

  //       let rowData = this.dataSource[i];
  //       let representativeName = rowData[toAggregate];

  //       if (i == 0) {
  //         this.interactionService._agg.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
  //       }
  //       else {
  //         let previousRowData = this.dataSource[i - 1];
  //         let previousRowGroup = previousRowData[toAggregate];
  //         if (representativeName === previousRowGroup)
  //           this.interactionService._agg.rowGroupMetadata[representativeName].size++;
  //         else
  //           this.interactionService._agg.rowGroupMetadata[representativeName] = { index: i, size: 1 };
  //       }
  //     }
  //   }
  // }
  // onSort() {

  //   if (this.interactionService._agg.flag) {
  //     this._sortField = this.interactionService._agg.selectedAggregate;
  //     this.updateRowGroupMetaData(this.interactionService._agg.selectedAggregate);
  //   }
  //   else {
  //     this.updateRowGroupMetaData('');
  //   }
  //   this.refreshTableAfterGrouping();
  // }

}
