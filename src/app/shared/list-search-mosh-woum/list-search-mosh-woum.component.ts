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
  dataSource: any;
  zoneDictionary: IDictionaryManager[] = [];
  _isNotForbidden: boolean;

  constructor(
    public listManagerService: ListManagerService,
    public config: DynamicDialogConfig,
  ) { }

  classWrapper = async () => {
    this.zoneDictionary = await this.listManagerService.getLMAllZoneDictionary();
    console.log(this.config.data);

    this.dataSource = this.config.data._data;
    this._isNotForbidden = this.config.data._isNotForbidden;
    // for latest reads component there is no zoneId element so The ifElse needed

    if (this.dataSource.zoneId || this.dataSource.zoneTitle) {
      if (this.dataSource.zoneId) {
        this.dataSource.zoneId = this.convertTitleToId(this.dataSource.zoneId).id;
      }
      else {
        this.dataSource.zoneId = this.convertTitleToId(this.dataSource.zoneTitle).id;
      }
    }
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  convertTitleToId = (dataSource: any): any => {
    return this.zoneDictionary.find(item => {
      if (item.title === dataSource)
        return item;
    })
  }


}
