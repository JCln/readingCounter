import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ENSelectedColumnVariables } from 'interfaces/ioverall-config';
import { Table } from 'primeng/table';
import { BrowserStorageService } from 'services/browser-storage.service';
import { OutputManagerService } from 'services/output-manager.service';
import { SearchService } from 'services/search.service';
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
  @Input() _allComponentIsModify: boolean = false;
  @Input() _hasCollapsible: boolean = false;
  @Input() _canShowButton: boolean = true;
  @Input() _isCollaped: boolean = false;
  @Input() _calculableSUM: boolean = false;

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
  @Output() showedWOUIAsCarousel = new EventEmitter<any>();
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
  @Output() showSearchedOptionsDialog = new EventEmitter<any>();
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
    public searchService: SearchService,
    public columnManager: ColumnManager,
    public utilsService: UtilsService
  ) {
    super(
      browserStorageService,
      utilsService,
      columnManager
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
  showWOUIAsCarousel = (dataSource: any, ri: number) => {
    this.showedWOUIAsCarousel.emit({ dataSource, ri });
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
  showSearchOptionsDialog = () => {
    this.showSearchedOptionsDialog.emit();
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
  routeToLoggs = (dataSource: string) => {
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
      total += item.itemQuantity
    })
    return total;
  }
}
