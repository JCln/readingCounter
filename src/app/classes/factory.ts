import { InteractionService } from 'services/interaction.service';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENColumnResizeMode, ENImageTypes, ENPrimeNGTranslator, EN_messages } from 'interfaces/enums.enum';
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
import { Table } from 'primeng/table';

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

    _reOrderableTable: boolean;
    tempOriginDataSource: any[] = [];
    ref: DynamicDialogRef;
    public readonly footerInfos = `نمایش از {first} تا{last} از {totalRecords} مورد`;
    public readonly routerLink: string = this.utilsService.compositeService.getRouterUrl();

    @Input() dataSource: any;
    @Input() _selectCols: any = [];
    @Input() _selectedColumns: any[];
    @Input() _outputFileName: string;
    @Input() _rowsPerPage: number[] = [10, 20, 50, 100];
    @Input() _paginator: boolean = true;
    @Input() _tooltipText: string;
    @Input() _numberOfExtraColumns: number[];
    @Input() _sessionName: string;
    @Input() _rowsNumbers = 10;
    @Input() readonly isAddableTable: boolean = false;
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
    @Input() _virtualScroll: boolean = false;
    @Input() _columnResizeMode: ENColumnResizeMode = ENColumnResizeMode.true;
    @Input() _hasColumnsResizable: boolean = false;
    @Input() _widthExpandMode: string = 'expand';

    constructor(
        public browserStorageService: BrowserStorageService,
        public utilsService: UtilsService,
        public columnManager: ColumnManager,
        public config: PrimeNGConfig,
        public dialogService: DialogService,
        public profileService: ProfileService,
        public interactionService: InteractionService
    ) {
        this.setTraslateToPrimeNgTable();
        this.getResizReOrderable();
        this.getVirtualScrollable();
        this.getHasColumnsResizable();
        this.getWidthExpandMode();
    }

    @Input() get selectedColumns(): any[] {
        return this._selectedColumns;
    }
    set selectedColumns(val: any[]) {
        //restore original order
        this._selectedColumns = this._selectCols.filter(col => val.includes(col));
    }
    hasBeenReadsToggler = () => {
        // if OnOffloadComponent rendering
        if (this._checkUpName == 'allComponent') {
            let temp: any[] = [];
            // should be false on initial(_primeNGHeaderCheckbox) because filter on DataSource happen
            if (this.columnManager._primeNGHeaderCheckbox) {
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

        this.browserStorageService.setToLocal(this._outputFileName, newArray);
        this.utilsService.snackBarMessageSuccess(EN_messages.tableSaved);
    }
    convertToOrigin = () => {
        for (let index = 0; index < this._selectCols.length; index++) {
            this._selectCols[index].isSelected = this._selectCols[index].isSelectedOrigin;
        }
    }
    restoreLatestColumnChanges = () => {
        if (!MathS.isNull(this._outputFileName)) {
            console.log(this._outputFileName);

            if (this.browserStorageService.isExists(this._outputFileName)) {
                this._selectCols = this.browserStorageService.getLocal(this._outputFileName);
            }
            else {
                console.log(this.columnManager.getColumnsMenus(this._outputFileName));
                this._selectCols = this.columnManager.getColumnsMenus(this._outputFileName);
            }
            this._selectedColumns = this.profileService.columnManager.customizeSelectedColumns(this._selectCols);
            console.log(this._selectedColumns);
        }
    }
    resetSavedColumns = () => {
        if (!MathS.isNull(this._outputFileName)) {
            // if origin columns not exists, it means contact did not clicked on save columns
            // working when data exists in local storage and reset button clicked now          
            // columns was saved on local storage and should going to remove
            if (this.browserStorageService.isExists(this._outputFileName)) {
                this.browserStorageService.removeLocal(this._outputFileName);
                this.convertToOrigin();
                this.utilsService.snackBarMessageSuccess(EN_messages.tableResetSaved);
            } else {
                this.convertToOrigin();
                this.utilsService.snackBarMessageSuccess(EN_messages.tableDefaultColumnOrder);
            }
            const url = this.utilsService.compositeService.getRouterUrl();
            this.interactionService.setRefresh(url);
        }
        else
            this.utilsService.snackBarMessageWarn(EN_messages.done);
    }
    refreshAggregatedTable = () => {
        const url = this.utilsService.compositeService.getRouterUrl();
        this.interactionService.setRefresh(url);
    }
    ngOnChanges(): void {
        this.restoreLatestColumnChanges();
        this.hasBeenReadsToggler();
    }
    setTraslateToPrimeNgTable = () => {
        this.config.setTranslation(ENPrimeNGTranslator);
    }
    getResizReOrderable = () => {
        this._reOrderableTable = this.profileService.getLocalReOrderable();
    }
    getVirtualScrollable = () => {
        this._virtualScroll = this.profileService.getLocalVirtuallScrollStatus();
    }
    getHasColumnsResizable = () => {
        this._hasColumnsResizable = this.profileService.getHasColumnsResizable();
    }
    getWidthExpandMode = () => {
        this._widthExpandMode = this.profileService.getWidthExpandMode();
    }
    denyTracking = (): boolean => {
        return this.utilsService.getDenyTracking();
    }
    clearFilters(session: Table) {
        this.utilsService.clearFilters(session);
    }
    copyToClipboard = str => {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText)
            return navigator.clipboard.writeText(str);
        return Promise.resolve(false);
    };
    copyContext(data: string) {
        console.log(data);

        if (this.utilsService.checkProtocol() && this.copyToClipboard(data)) {
            this.utilsService.snackBarMessageSuccess(EN_messages.savedToClipboard);
        }
        else {
            const config = {
                messageTitle: EN_messages.saveToClipbloardTitle,
                text: data,
                minWidth: '19rem',
                isInput: false,
                isDelete: false,
                icon: 'pi pi-info',
                tooltipText: EN_messages.cannotSaveToClipbloard
            }
            this.utilsService.firstConfirmDialog(config);
        }
        return false;
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
        if (dataSource.imageCount) {
            this.ref = this.dialogService.open(ListSearchMoshWoumComponent, {
                data: { _data: dataSource, _type: ENImageTypes.typical },
                rtl: true,
                width: '80%'
            })
            this.ref.onClose.subscribe(async res => {
                if (res)
                    console.log(res);
            });
        }
        else {
            this.listManagerService.utilsService.snackBarMessageWarn(EN_messages.imageNotExists);
        }
    }
    routeToOffload = (event: object) => {
        setTimeout(() => {
            console.log(event); // not exactly why but without console.log modify carousel not working on next and previous clicked on first glance of allComponent(modifyCompnent) view
            this.carouselDataSource = event['dataSource'];
            this.rowIndex = event['ri'];
            this.showCarousel = true;
        }, 0);
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
        const a = await this.listManagerService.ajaxReqWrapperService.postDataSourceById(ENInterfaces.ReadingReportTitles, $event)
        if (a.length) {
            this.listManagerService.showResDialog(a, false, EN_messages.insert_rrDetails);
            return;
        }
        this.listManagerService.snackEmptyValue();
    }
    refreshTable = () => {
        this.classWrapper(true);
    }
    copyToClipboard = str => {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText)
            return navigator.clipboard.writeText(str);
        return Promise.resolve(false);
    };
    copyContext(data: string) {
        if (this.listManagerService.utilsService.checkProtocol() && this.copyToClipboard(data))
            this.listManagerService.utilsService.snackBarMessageSuccess(EN_messages.savedToClipboard);
        else {
            const config = {
                messageTitle: EN_messages.saveToClipbloardTitle,
                text: data,
                minWidth: '19rem',
                isInput: false,
                isDelete: false,
                icon: 'pi pi-info',
                tooltipText: EN_messages.cannotSaveToClipbloard
            }
            this.listManagerService.utilsService.firstConfirmDialog(config);
        }
        return false;
    }

}