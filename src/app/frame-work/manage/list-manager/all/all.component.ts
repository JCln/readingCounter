import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { filter } from 'rxjs/internal/operators/filter';
import { InteractionService } from 'services/interaction.service';
import { ListManagerService } from 'services/list-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent extends FactoryONE {
  trackId: string;
  isModify: string | boolean;

  carouselDataSource: IOnOffLoadFlat;
  showCarousel: boolean = false;

  rowIndex: number = 0;
  dataSource: IOnOffLoadFlat[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    public interactionService: InteractionService,
    public listManagerService: ListManagerService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {
    super();
    this.getRouteParams();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.listManagerService.nullSavedAllLMSource();
    }

    this.dataSource = await this.listManagerService.getLMAll(this.trackId);
    this.dataSource = JSON.parse(JSON.stringify(this.dataSource));

    if (!this.dataSource.length)
      return;

    this.zoneDictionary = await this.listManagerService.getLMAllZoneDictionary();
    this.karbariDictionary = await this.listManagerService.getKarbariDictionary();
    this.karbariDictionaryCode = await this.listManagerService.getKarbariDictionaryCode();
    this.qotrDictionary = await this.listManagerService.getQotrDictionary();
    this.counterStateDictionary = await this.listManagerService.getCounterStateDictionary();
    const tempZone: number = parseInt(this.dataSource[0].zoneId.toString());
    if (tempZone) {
      this.counterStateByCodeDictionary = await this.listManagerService.getCounterStateByCodeDictionary(tempZone);
      Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'counterStateCode');
      Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');
    }

    // Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');

    this.setDynamicRages();
    this.makeHadPicturesToBoolean();
    this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.listManagerService.columnLMAll();
    this._selectedColumns = this.listManagerService.customizeSelectedColumns(this._selectCols);
  }
  isFromOffloadPage = () => {
    this.trackId = this.route.snapshot.paramMap.get('trackingId');
    this.isModify = this.route.snapshot.paramMap.get('isModify');
    this.isModify = this.isModify.toLocaleLowerCase() === 'true' ? true : false;
  }
  getRouteParams = () => {
    this.subscription.push(this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.isFromOffloadPage();
      this.classWrapper();
    })
    )
  }
  routeToWoui = (object: IOnOffLoadFlat) => {
    this.router.navigate(['wr/m/track/woui', false, object.id]);
  }
  routeToOffload = (event: object) => {
    this.carouselDataSource = event['dataSource'];
    this.rowIndex = event['ri'];
    this.showCarousel = true;
  }
  carouselNextItem = () => {

    this.rowIndex > this.dataSource.length - 1 ? this.rowIndex = 0 : this.rowIndex++;
    this.carouselDataSource = this.dataSource[this.rowIndex];
  }
  carouselPrevItem = () => {
    this.rowIndex < 1 ? this.rowIndex = this.dataSource.length : this.rowIndex--;
    this.carouselDataSource = this.dataSource[this.rowIndex];
  }
  // convertTitleToId = (dataSource: any): any => {
  // this.carouselDataSource.zoneId = this.convertTitleToId(this.dataSource[this.rowIndex].zoneId)
  //   return this.zoneDictionary.find(item => {
  //     if (item.title === dataSource) {
  //       console.log(item.id);
  //       return item.id;
  //     }
  //   })
  // }
  carouselCancelClicked = () => {
    this.showCarousel = false;
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  toPrePage = () => {
    if (this.isModify) {
      this.router.navigate(['/wr/m/track/offloaded']);
      return;
    }
    this._location.back();
  }
  setDynamicRages = () => {
    this.listManagerService.setDynamicPartRanges(this.dataSource);
  }
  makeHadPicturesToBoolean = () => {
    this.dataSource.forEach(item => {
      if (item.imageCount > 0)
        item.imageCount = true;
      else
        item.imageCount = false;
    })
  }
  ngOnInit(): void { return; }
  getReadingReportTitles = async ($event) => {
    const a = await this.listManagerService.postById(ENInterfaces.ReadingReportTitles, $event)
    if (a.length) {
      this.listManagerService.showResDialog(a, false, EN_messages.insert_rrDetails);
      return;
    }
    this.listManagerService.snackEmptyValue();
  }
}