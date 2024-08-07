import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ENSelectedColumnVariables } from 'interfaces/enums.enum';
import { PrimeNGConfig, SortEvent } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { BrowserStorageService } from 'services/browser-storage.service';
import { InteractionService } from 'services/interaction.service';
import { OutputManagerService } from 'services/output-manager.service';
import { ProfileService } from 'services/profile.service';
import { UtilsService } from 'services/utils.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { FactorySharedPrime } from 'src/app/classes/factory';

@Component({
  selector: 'app-prime-table-editable',
  templateUrl: './prime-table-editable.component.html',
  styleUrls: ['./prime-table-editable.component.scss']
})
export class PrimeTableEditableComponent extends FactorySharedPrime {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
  onRowEditing: any;
  @ViewChild(Table) dtable: Table;
  hasFiltersInTable: boolean = false;

  @Input() _sortBy: string;
  @Input() _sortOrder: number = 1;
  @Input() _isInRowEditing: boolean = false;
  @Input() _dictionaryName: string = '';
  @Input() _secondDictionaryName: string = '';
  @Input() newRow: object;
  @Input() dictionary = new EventEmitter<any>();
  @Input() newRowLimit: number;
  @Input() secondDictionary = new EventEmitter<any>();

  @Output() filteredEvent = new EventEmitter<any>();
  @Output() showedWOUIAsCarousel = new EventEmitter<any>();
  @Output() showedInMapSingle = new EventEmitter<any>();
  @Output() showedPictures = new EventEmitter<any>();
  @Output() openedBriefKardexDialog = new EventEmitter<any>();
  @Output() receivedDateJalali = new EventEmitter<any>();
  @Output() refreshedTable = new EventEmitter<boolean>();
  @Output() onRowEditedInit = new EventEmitter<any>();
  @Output() onRowEditedSave = new EventEmitter<any>();
  @Output() onRowEditedCancel = new EventEmitter<any>();
  @Output() onRowEditedCancelRowEditing = new EventEmitter<any>();
  @Output() removedRow = new EventEmitter<any>();
  @Output() removedRowEditing = new EventEmitter<any>();
  @Output() openedAddDialog = new EventEmitter<any>();
  @Output() openedBatchedAddDialog = new EventEmitter<any>();
  @Output() newedRowChangedStatus = new EventEmitter<any>();
  @Output() getedExcelSample = new EventEmitter<any>();
  @Output() openedAddExcelDialog = new EventEmitter<any>();
  @Output() routedToParent = new EventEmitter<any>();
  @Output() openedMoshtarakinDialog = new EventEmitter<any>();

  constructor(
    public outputManagerService: OutputManagerService,
    public browserStorageService: BrowserStorageService,
    public columnManager: ColumnManager,
    public utilsService: UtilsService,
    public config: PrimeNGConfig,
    public dialogService: DialogService,
    public profileService: ProfileService,
    public interactionService: InteractionService
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
  clickedDropDowns = (event: any, element: string, dataId: any) => {
    for (let index = 0; index < this.dataSource.length; index++) {
      if (this.dataSource[index].id === dataId) {
        this.dataSource[index][element] = event.title;
      }
    }
  }
  clickedDropDownsFirst = (event: any, element: string, dataId: any, dictionary: any) => {
    console.log(event);
    console.log(dictionary);
    console.log(element);
    console.log(dataId);

    for (let index = 0; index < this.dataSource.length; index++) {
      if (this.dataSource[index].id === dataId.id) {
        console.log(dataId);
        this.dataSource[index][element] = event.title;
      }
    }
  }
  refreshTable() {
    this.refreshedTable.emit(true);
  }
  openBriefKardexDialog = (dataSource: object) => {
    this.openedBriefKardexDialog.emit(dataSource);
  }
  onRowEditInit = (dataSource: object) => {
    this.onRowEditing = JSON.parse(JSON.stringify(dataSource));
    this.onRowEditedInit.emit(dataSource);
  }
  onRowEditSave = (dataSource: object, ri: number) => {
    this.onRowEditedSave.emit({ dataSource, ri });
  }
  onRowEditCancel = (dataSource: any, ri: number, dictionary: any) => {
    for (let index = 0; index < this.dataSource.length; index++) {
      if (dataSource.id === this.dataSource[index].id) {
        this.dataSource[index][dictionary] = this.onRowEditing[dictionary];
        if (this._secondDictionaryName !== '')
          this.dataSource[index][this._secondDictionaryName] = this.onRowEditing[this._secondDictionaryName];
      }
    }
    this.onRowEditedCancel.emit({ dataSource, ri });
  }
  onRowEditCancelRowEditing = (dataSource: object, ri: number, secondDictionaryName: any) => {
    console.log(dataSource);
    console.log(this.dataSource[0]);

    this.onRowEditedCancelRowEditing.emit({ dataSource, ri });
  }
  removeRow = (dataSource: object, ri: number) => {
    this.removedRow.emit({ dataSource, ri });
  }
  removeRowEditing = (dataSource: object, ri: number) => {
    this.removedRowEditing.emit({ dataSource, ri })
  }
  openAddDialog = () => {
    this.openedAddDialog.emit();
  }
  openBatchAddDialog = () => {
    this.openedBatchedAddDialog.emit();
  }
  newRowChangedStatus = () => {
    this.newedRowChangedStatus.emit();
  }
  getExcelSample = () => {
    this.getedExcelSample.emit();
  }
  openAddExcelDialog = () => {
    this.openedAddExcelDialog.emit();
  }
  routeToParent = () => {
    this.routedToParent.emit();
  }
  filterEventTable(e: Table) {
    this.hasFilters(e);// check whether there is new filter to affect on filter icon in tables
    this.filteredEvent.emit(e.filteredValue);
  }
  showWOUIAsCarousel = (dataSource: any, ri: number) => {
    this.showedWOUIAsCarousel.emit({ dataSource, ri });
  }
  showPictures = ($event) => {
    this.showedPictures.emit($event);
  }
  showInMapSingle = (dataSource: object) => {
    this.showedInMapSingle.emit(dataSource);
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
  receiveDateJalali = (event: string, ri: number) => {
    // it may work only for General modify component
    this.dataSource[ri].offloadDateJalali = event;
    this.receivedDateJalali.emit(event);
  }
  openMoshtarakinDialog = (dataSource: any) => {
    this.openedMoshtarakinDialog.emit(dataSource);
  }
  clearFilters(table: Table) {
    this.utilsService.clearFilters(table);
    this.hasFiltersInTable = false;
  }
  hasFilters = (dtable: Table) => {
    this.hasFiltersInTable = this.utilsService.hasFilters(dtable);
  }

}
