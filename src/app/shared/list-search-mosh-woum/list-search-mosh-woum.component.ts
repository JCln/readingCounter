import { Component, OnInit } from '@angular/core';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ListManagerService } from 'services/list-manager.service';

@Component({
  selector: 'app-list-search-mosh-woum',
  templateUrl: './list-search-mosh-woum.component.html',
  styleUrls: ['./list-search-mosh-woum.component.scss']
})
export class ListSearchMoshWoumComponent implements OnInit {
  auxDataSource: any;
  zoneDictionary: IDictionaryManager[] = [];
  _isNotForbidden: boolean;

  constructor(
    public listManagerService: ListManagerService,
    public config: DynamicDialogConfig,
  ) { }

  classWrapper = async () => {
    this.zoneDictionary = await this.listManagerService.dictionaryWrapperService.getZoneDictionary();
    this.auxDataSource = JSON.parse(JSON.stringify(this.config.data._data));
    this._isNotForbidden = this.config.data._isNotForbidden;

    // for gridBased which doesn't have id should assign fileRepositorayId
    if (!this.auxDataSource.id) {
      this.auxDataSource.id = this.auxDataSource['onOffLoadId'];
    }

    // for latest reads component there is no zoneId element so The ifElse needed
    if (this.auxDataSource.zoneId || this.auxDataSource.zoneTitle) {
      if (this.auxDataSource.zoneId) {
        this.auxDataSource.zoneId = this.convertTitleToId(this.auxDataSource.zoneId).id;
      }
      else {
        this.auxDataSource.zoneId = this.convertTitleToId(this.auxDataSource.zoneTitle).id;
      }
    }
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  convertTitleToId = (auxDataSource: any): any => {
    return this.zoneDictionary.find(item => {
      if (item.title === auxDataSource)
        return item;
    })
  }


}
