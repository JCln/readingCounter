import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { ITextOutput } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { OutputManagerService } from 'src/app/services/output-manager.service';
import { TextOutputFieldManagerService } from 'src/app/services/text-output-field-manager.service';

@Component({
  selector: 'app-txt-output',
  templateUrl: './txt-output.component.html',
  styleUrls: ['./txt-output.component.scss']
})
export class TxtOutputComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription[] = [];

  table: Table;
  dataSource: ITextOutput[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private textOutputFieldManagerService: TextOutputFieldManagerService,
    public outputManagerService: OutputManagerService
  ) {
  }

  convertIdToTitle = (dataSource: any, zoneDictionary: IDictionaryManager[]) => {
    dataSource.map(dataSource => {
      zoneDictionary.map(zoneDic => {
        if (zoneDic.id === dataSource.zoneId)
          dataSource.zoneId = zoneDic.title;
      })
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForTextOutput = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForTextOutput) {
      this.dataSource = this.closeTabService.saveDataForTextOutput;
    }
    else {
      this.dataSource = await this.textOutputFieldManagerService.getOutputTextField();
      this.closeTabService.saveDataForTextOutput = this.dataSource;
    }
    this.zoneDictionary = await this.textOutputFieldManagerService.getZoneDictionary();
    this.convertIdToTitle(this.dataSource, this.zoneDictionary);

    if (this.dataSource.length)
      this.insertSelectedColumns();
  }
  customizeSelectedColumns = () => {
    return this._selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  insertSelectedColumns = () => {
    this._selectCols = this.textOutputFieldManagerService.columnSelectedTextOutput();
    this._selectedColumns = this.customizeSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/txt/out')
          this.classWrapper(true);
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  refreshTable = () => {
    this.classWrapper(true);
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
}
