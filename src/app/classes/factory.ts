import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { BrowserStorageService } from 'services/browser-storage.service';
import { ListManagerService } from 'services/list-manager.service';
import { UtilsService } from 'services/utils.service';
import { ColumnManager } from 'src/app/classes/column-manager';

import { MapDgComponent } from '../frame-work/manage/list-manager/all/map-dg/map-dg.component';
import {
    ListSearchMoshWoumComponent,
} from '../frame-work/manage/list-manager/list-search-mosh-dg/list-search-mosh-woum/list-search-mosh-woum.component';
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
        /** UPDATE: 
         * TODO: REMOVE subscription because another perfect way
         * implemented on lastest merge
         */
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
    @Input() dataSource: any[] = [];
    @Input() _selectCols: any = [];
    @Input() _selectedColumns: any[];
    @Input() _outputFileName: string;
    @Input() _tooltipText: string;

    constructor(
        public browserStorageService: BrowserStorageService,
        public utilsService: UtilsService,
        public columnManager: ColumnManager,
    ) { }

    @Input() get selectedColumns(): any[] {
        return this._selectedColumns;
    }
    set selectedColumns(val: any[]) {
        //restore original order
        this._selectedColumns = this._selectCols.filter(col => val.includes(col));
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
    ngOnChanges(): void {
        if (!MathS.isNull(this._outputFileName)) {

            if (this.browserStorageService.isExists(this._outputFileName)) {
                this._selectCols = this.browserStorageService.get(this._outputFileName);
                this._showSavedColumnButton = false;
            }
            else {
                this._selectCols = this.columnManager.columnSelectedMenus(this._outputFileName);
                this._showSavedColumnButton = true;
            }
            this._selectedColumns = this.columnManager.customizeSelectedColumns(this._selectCols);
        }
    }

    resetSavedColumns = () => {
        if (!MathS.isNull(this._outputFileName)) {
            if (this.browserStorageService.isExists(this._outputFileName)) {
                this.browserStorageService.removeLocal(this._outputFileName);
                this._showSavedColumnButton = true;
                this.utilsService.snackBarMessageSuccess(EN_messages.tableResetSaved);
            }
        }
        else
            this.utilsService.snackBarMessageWarn(EN_messages.done);
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
            data: dataSource,
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