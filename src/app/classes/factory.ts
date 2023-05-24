import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { BrowserStorageService } from 'services/browser-storage.service';
import { ListManagerService } from 'services/list-manager.service';
import { ProfileService } from 'services/profile.service';
import { UtilsService } from 'services/utils.service';
import { ColumnManager } from 'src/app/classes/column-manager';

import { MapDgComponent } from '../frame-work/manage/list-manager/all/map-dg/map-dg.component';
import { ListSearchMoshWoumComponent } from '../shared/list-search-mosh-woum/list-search-mosh-woum.component';
import { MathS } from './math-s';

@Component({
    template: ''
})
export abstract class FactoryONE implements OnInit, OnDestroy {
    subscription: Subscription[] = [];

    constructor() { }

    abstract classWrapper(canRefresh?: boolean): void;

    ngOnDestroy(): void {
        //  for purpose of refresh any time even without new event emiteds
        // we use subscription and not use take or takeUntil
        this.subscription.forEach(subscription => subscription.unsubscribe());
    }
    ngOnInit(): void {
        this.classWrapper();
    }
    refreshTable = () => {
        this.classWrapper(true);
    }
}

@Component({
    template: ''
})
export class FactorySharedPrime implements OnChanges {

    _showSavedColumnButton: boolean;
    _reOrderableTable: boolean;
    tempOriginDataSource: any[] = [];
    ref: DynamicDialogRef;

    @Input() dataSource: any[] = [];
    @Input() _selectCols: any = [];
    @Input() _selectedColumns: any[];
    @Input() _outputFileName: string;
    @Input() _rowsPerPage: number[] = [10, 100, 1000, 5000];
    @Input() _tooltipText: string;
    @Input() _numberOfExtraColumns: number[];
    @Input() _sessionName: string;
    @Input() _rowsNumbers = 10;
    @Input() _selectedColumnsToRemember: string;
    @Input() _backToPreviousText: string;
    @Input() _captionEnabled: boolean = true;
    @Input() _sortField: string = '';
    @Input() _outputEnabled: boolean = true;
    @Input() _backToPreviousEnabled: boolean = false;
    @Input() _checkUpName: string = '';
    @Input() _multiSelectEnable: boolean = true;
    @Input() _isCustomSort: boolean = false;
    @Input() _hasSaveColumns: boolean = true;
    @Input() _hasRefreshTable: boolean = true;

    constructor(
        public browserStorageService: BrowserStorageService,
        public utilsService: UtilsService,
        public columnManager: ColumnManager,
        public config: PrimeNGConfig,
        public dialogService: DialogService,
        public profileService: ProfileService
    ) {
        this.setTraslateToPrimeNgTable();
        this.getResizReOrderable();
    }

    @Input() get selectedColumns(): any[] {
        return this._selectedColumns;
    }
    set selectedColumns(val: any[]) {
        //restore original order
        this._selectedColumns = this._selectCols.filter(col => val.includes(col));
    }
    filterCounterState = () => {
        // if OnOffloadComponent rendering
        if (this._checkUpName == 'allComponent') {
            let temp: any[] = [];
            // should be false on initial(_primeNGHeaderCheckbox) because filter on DataSource happen
            if (this.profileService.columnManager._primeNGHeaderCheckbox) {
                this.tempOriginDataSource = JSON.parse(JSON.stringify(this.dataSource));
                for (let index = 0; index < this.dataSource.length; index++) {
                    if (this.dataSource[index].counterStateId !== null)
                        temp.push(this.dataSource[index]);
                }
                this.dataSource = temp;
            }
            else {
                if (!MathS.isNull(this.tempOriginDataSource))
                    this.dataSource = this.tempOriginDataSource;
            }
        }
    }
    saveColumns() {
        let newArray: any[] = [];
        for (let i = 0; i < this._selectCols.length; i++) {
            let element = this._selectCols[i];
            element.isSelected = false;
            newArray.push(element);
            for (let j = 0; j < this._selectedColumns.length; j++) {
                if (this._selectCols[i].field == this._selectedColumns[j].field) {
                    element.isSelected = true;
                    newArray[i].isSelected = true;
                }
            }
        }

        this.browserStorageService.set(this._outputFileName, newArray);
        this.utilsService.snackBarMessageSuccess(EN_messages.tableSaved);
        if (!this.browserStorageService.isExists(this._outputFileName))
            this._showSavedColumnButton = true;
    }
    restoreLatestColumnChanges = () => {
        if (!MathS.isNull(this._outputFileName)) {

            if (this.browserStorageService.isExists(this._outputFileName)) {
                this._selectCols = this.browserStorageService.get(this._outputFileName);
                this._showSavedColumnButton = false;
            }
            else {
                this._selectCols = this.profileService.columnManager.columnSelectedMenus(this._outputFileName);
                this._showSavedColumnButton = true;
            }
            this._selectedColumns = this.profileService.columnManager.customizeSelectedColumns(this._selectCols);
        }
    }
    resetSavedColumns = () => {
        if (!MathS.isNull(this._outputFileName)) {
            if (this.browserStorageService.isExists(this._outputFileName)) {
                this.browserStorageService.removeLocal(this._outputFileName);
                this._showSavedColumnButton = true;
                this.utilsService.snackBarMessageSuccess(EN_messages.tableResetSaved);
            } else {
                this.utilsService.snackBarMessageSuccess(EN_messages.tableDefaultColumnOrder);
            }
        }
        else
            this.utilsService.snackBarMessageWarn(EN_messages.done);
    }
    ngOnChanges(): void {
        this.restoreLatestColumnChanges();
        this.filterCounterState();
    }
    setTraslateToPrimeNgTable = () => {
        this.config.setTranslation({
            'accept': 'تایید',
            'reject': 'بازگشت',
            'startsWith': ' شروع با',
            'contains': 'شامل باشد',
            'notContains': ' شامل نباشد',
            'endsWith': ' پایان با',
            'equals': 'برابر',
            'notEquals': 'نا برابر',
            'lt': ' کمتر از',
            'lte': 'کمتر یا برابر',
            'gt': 'بزرگتر',
            'gte': 'بزرگتر یا برابر',
            'is': 'باشد',
            'isNot': 'نباشد',
            'before': 'قبل',
            'after': 'بعد',
            'clear': 'پاک کردن',
            'apply': 'تایید',
            'matchAll': 'مطابقت با همه',
            'matchAny': ' مطابقت',
            'addRule': 'جستجو براساس',
            'removeRule': 'حذف جستجو',
            'choose': ' انتخاب',
            'upload': 'ارسال',
            'cancel': 'بازگشت'
        });
    }
    doShowCarousel = (dataSource: any, _isNotForbidden?: boolean) => {
        // should not open dialog when no images exists
        if (dataSource.imageCount) {
            this.ref = this.dialogService.open(ListSearchMoshWoumComponent, {
                data: { _data: dataSource, _isNotForbidden: _isNotForbidden },
                rtl: true,
                width: '80%',
            })
            this.ref.onClose.subscribe(async res => {
                if (res)
                    console.log(res);
            });
        } else {
            this.utilsService.snackBarMessageWarn(EN_messages.imageNotExists);
        }
    }
    doShowCarouselForbidden = (dataSource: any) => {
        // To make imageWrapper config Dialog for forbidden
        this.doShowCarousel(dataSource, false);
    }
    getResizReOrderable = () => {
        this._reOrderableTable = this.profileService.getLocalReOrderable();
    }
    denyTracking = (): boolean => {
        return this.utilsService.getDenyTracking();
    }

}

@Component({
    template: ''
})
export abstract class AllListsFactory implements OnInit, OnDestroy {
    subscription: Subscription[] = [];
    carouselDataSource: IOnOffLoadFlat;
    filterableDataSource: IOnOffLoadFlat[] = [];
    ref: DynamicDialogRef;
    rowIndex: number = 0;
    showCarousel: boolean = false;
    showWouImages: boolean = false;

    constructor(
        public dialogService: DialogService,
        public listManagerService: ListManagerService
    ) { }

    abstract classWrapper(canRefresh?: boolean): void;

    ngOnDestroy(): void {
        //  for purpose of refresh any time even without new event emiteds
        // we use subscription and not use take or takeUntil
        /** UPDATE: 
         * TODO: REMOVE subscription because another perfect way
         * implemented on lastest merge
         */
        this.subscription.forEach(subscription => subscription.unsubscribe());
    }
    ngOnInit(): void {
        this.classWrapper();
    }
    filteredTableEvent = (e: any) => {
        this.filterableDataSource = e;
    }
    doShowCarousel = (dataSource: any) => {
        this.ref = this.dialogService.open(ListSearchMoshWoumComponent, {

            data: { _data: dataSource, _isNotForbidden: true },
            rtl: true,
            width: '80%'
        })
        this.ref.onClose.subscribe(async res => {
            if (res)
                console.log(res);

        });
    }
    routeToOffload = (event: object) => {
        this.carouselDataSource = event['dataSource'];
        this.rowIndex = event['ri'];
        this.showCarousel = true;
    }
    carouselNextItem = () => {
        this.rowIndex >= this.filterableDataSource.length - 1 ? this.rowIndex = 0 : this.rowIndex++;
        this.carouselDataSource = this.filterableDataSource[this.rowIndex];
    }
    carouselPrevItem = () => {
        this.rowIndex < 1 ? this.rowIndex = this.filterableDataSource.length - 1 : this.rowIndex--;
        this.carouselDataSource = this.filterableDataSource[this.rowIndex];
    }
    carouselCancelClicked = () => {
        this.showCarousel = false;
        this.showWouImages = false;
    }
    openMapDialog = (dataSource: any) => {
        if (this.listManagerService.showInMapSingleValidation(dataSource))
            this.ref = this.dialogService.open(MapDgComponent, {
                data: dataSource,
                rtl: true,
                width: '70%'
            })
        this.ref.onClose.subscribe(async res => {
            if (res)
                this.refreshTable();
        });
    }
    getReadingReportTitles = async ($event) => {
        const a = await this.listManagerService.postById(ENInterfaces.ReadingReportTitles, $event)
        if (a.length) {
            this.listManagerService.showResDialog(a, false, EN_messages.insert_rrDetails);
            return;
        }
        this.listManagerService.snackEmptyValue();
    }
    refreshTable = () => {
        this.classWrapper(true);
    }

}