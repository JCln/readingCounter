import { Component, OnInit } from '@angular/core';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ListManagerService } from 'services/list-manager.service';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-list-search-mosh-woum',
  templateUrl: './list-search-mosh-woum.component.html',
  styleUrls: ['./list-search-mosh-woum.component.scss']
})
export class ListSearchMoshWoumComponent implements OnInit {
  auxDataSource: any;
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    public listManagerService: ListManagerService,
    public config: DynamicDialogConfig,
  ) { }

  convertTitleToId = (value: any): any => {
    return this.zoneDictionary.find(item => {
      if (item.title === value)
        return item;
    })
  }
  checkConvertZoneToId = () => {
    // convert title to appropriate id
    if (this.auxDataSource.zoneId || this.auxDataSource.zoneTitle) {
      if (this.auxDataSource.zoneId) {
        this.auxDataSource.zoneId = this.convertTitleToId(this.auxDataSource.zoneId).id;
      }
      else {
        this.auxDataSource.zoneId = this.convertTitleToId(this.auxDataSource.zoneTitle).id;
      }
    }
  }
  classWrapper = async () => {
    this.zoneDictionary = await this.listManagerService.dictionaryWrapperService.getZoneDictionary();
    this.auxDataSource = JSON.parse(JSON.stringify(this.config.data._data));
    // Define type as value        
    this.auxDataSource._type = this.config.data._type;

    // for gridBased which doesn't have id should assign fileRepositorayId
    if (!this.auxDataSource.id) {
      this.auxDataSource.id = this.auxDataSource['onOffLoadId'];
    }

    // for latest reads component there is no zoneId element so The ifElse needed
    if (!MathS.isNaN(this.auxDataSource.zoneId))
      return;

    this.checkConvertZoneToId();
  }
  ngOnInit(): void {
    this.classWrapper();
  }


}
