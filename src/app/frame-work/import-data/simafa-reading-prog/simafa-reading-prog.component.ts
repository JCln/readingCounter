import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IImportSimafaReadingProgramsReq, IReadingProgramRes } from 'interfaces/inon-manage';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { InteractionService } from 'services/interaction.service';
import { OutputManagerService } from 'services/output-manager.service';

@Component({
  selector: 'app-simafa-reading-prog',
  templateUrl: './simafa-reading-prog.component.html',
  styleUrls: ['./simafa-reading-prog.component.scss']
})
export class SimafaReadingProgComponent implements OnInit, AfterViewInit, OnDestroy {
  importSimafaReadingProgram: IImportSimafaReadingProgramsReq = {
    zoneId: 0,
    readingPeriodId: 0,
    year: 0
  }

  _empty_message: string = '';
  kindId: number = 0;
  _years: ITitleValue[] = [];
  _selectedKindId: string = '';
  readingPeriodKindsDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  dataSource: IReadingProgramRes[] = [];
  _selectCols: any[] = [];
  _selectedColumns: any[];
  subscription: Subscription[] = [];

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private importDynamicService: ImportDynamicService,
    public outputManagerService: OutputManagerService
  ) { }

  connectToServer = async () => {
    const validation = this.importDynamicService.checkSimafaVertification(this.importSimafaReadingProgram);
    if (!validation)
      return;
    this.dataSource = await this.importDynamicService.postImportSimafa(ENInterfaces.postSimafaReadingProgram, this.importSimafaReadingProgram);
    this._empty_message = EN_messages.notFound;
    this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.importDynamicService.columnSimafaReadingProgram();
    this._selectedColumns = this.importDynamicService.customizeSelectedColumns(this._selectCols);
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.importDynamicService.getReadingPeriodDictionary(this._selectedKindId);
  }
  nullSavedSource = () => this.closeTabService.saveDataForSimafaReadingPrograms = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.readingPeriodKindsDictionary = await this.importDynamicService.getReadingPeriodsKindDictionary();
    this.zoneDictionary = await this.importDynamicService.getZoneDictionary();
    this._years = this.importDynamicService.getYears();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/imp/simafa/rdpg') {
          this.classWrapper(true);
        }
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
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  refreshTable = () => {
    this.connectToServer();
  }
}
