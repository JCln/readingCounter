import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ForbiddenService } from 'services/forbidden.service';
import { ListManagerService } from 'services/list-manager.service';
import { OutputManagerService } from 'services/output-manager.service';
import { ReadManagerService } from 'services/read-manager.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { SearchService } from 'services/search.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { UsersAllService } from 'services/users-all.service';

@Component({
  selector: 'app-prime-table',
  templateUrl: './prime-table.component.html',
  styleUrls: ['./prime-table.component.scss']
})
export class PrimeTableComponent {
  @Input() dataSource: any[] = [];
  @Input() _selectCols: any = [];
  @Input() _selectedColumns: any[];
  @Input() _outputFileName: string;
  @Input() _rowsPerPage: number[] = [10, 20, 50, 100, 500];
  @Input() _rowsNumbers = 20;
  @Input() _numberOfExtraColumns: number[];
  @Input() _sessionName: string;
  @Input() _selectedColumnsToRemember: string;
  @Input() _backToPreviousText: string;
  @Input() _captionEnabled: boolean = true;
  @Input() _sortField: string = '';
  @Input() _sortOrder: number = -1;
  @Input() _sortMode: string = 'single';
  @Input() _outputEnabled: boolean = true;
  @Input() _backToPreviousEnabled: boolean = false;
  @Input() _checkUpName: string = '';
  @Input() _multiSelectEnable: boolean = true;
  @Input() _allComponentIsModify: boolean = false;

  @Output() removedRow = new EventEmitter<any>();
  @Output() openedEditDialog = new EventEmitter<any>();
  @Output() refreshedTable = new EventEmitter<boolean>();
  @Output() forcedOffload = new EventEmitter<any>();
  @Output() backedToImportedConfirmDialog = new EventEmitter<any>();
  @Output() routedToLMPayDay = new EventEmitter<any>();
  @Output() routedToLMAll = new EventEmitter<any>();
  @Output() showedMoreDetails = new EventEmitter<any>();
  @Output() firstConfirmedDialog = new EventEmitter<any>();
  @Output() showedInMap = new EventEmitter<any>();
  @Output() showedInMapDESC = new EventEmitter<any>();
  @Output() downloadedOutputSingle = new EventEmitter<any>();
  @Output() routeedToOffloadModify = new EventEmitter<any>();
  @Output() backedToReading = new EventEmitter<any>();
  @Output() backedToPrevious = new EventEmitter<any>();
  @Output() downloadedAPK = new EventEmitter<any>();
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
  @Output() toPredStatus = new EventEmitter<any>();
  @Output() routedToSingle = new EventEmitter<any>();
  @Output() routedToBatch = new EventEmitter<any>();

  constructor(
    public outputManagerService: OutputManagerService,
    public trackingManagerService: TrackingManagerService,
    public searchService: SearchService,
    public listManagerService: ListManagerService,
    public usersAllService: UsersAllService,
    public forbiddenService: ForbiddenService,
    public readManagerService: ReadManagerService,
    public readingReportManagerService: ReadingReportManagerService
  ) { }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }

  refreshTable() {
    this.refreshedTable.emit(true);
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
  routeToLMAll = (dataSource: object) => {
    this.routedToLMAll.emit(dataSource);
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
  showInMapDESC = () => {
    this.showedInMapDESC.emit();
  }
  downloadOutputSingle = (dataSource: object) => {
    this.downloadedOutputSingle.emit(dataSource);
  }
  routeToOffloadModify = (dataSource: object) => {
    this.routeedToOffloadModify.emit(dataSource);
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
  showPictures = ($event) => {
    this.showedPictures.emit($event);
  }
  showSearchOptionsDialog = () => {
    this.showSearchedOptionsDialog.emit();
  }
  routeToOffload = ($event) => {
    this.routedToOffload.emit($event);
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
  toPreStatus = (val: any) => {
    this.toPredStatus.emit(val);
  }
  removeRow = (dataSource: object, ri: number) => {
    this.removedRow.emit({ dataSource, ri });
  }
  openEditDialog = (dataSource: object) => {
    this.openedEditDialog.emit(dataSource);
  }
  routeToBatch = (dataSource: object) => {
    this.routedToBatch.emit(dataSource);
  }
  routeToSingle = (dataSource: object) => {
    this.routedToSingle.emit(dataSource);
  }
}
