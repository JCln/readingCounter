import { Component, OnInit } from '@angular/core';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ListManagerService } from 'services/list-manager.service';

@Component({
  selector: 'app-list-search-mosh-woum',
  templateUrl: './list-search-mosh-woum.component.html',
  styleUrls: ['./list-search-mosh-woum.component.scss']
})
export class ListSearchMoshWoumComponent implements OnInit {
  dataSource: IOnOffLoadFlat;
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    public listManagerService: ListManagerService,
    public config: DynamicDialogConfig,
  ) { }

  classWrapper = async () => {
    this.zoneDictionary = await this.listManagerService.getLMAllZoneDictionary();
    this.dataSource = this.config.data.dataSource;
    this.dataSource.zoneId = this.convertTitleToId(this.dataSource.zoneId).id;
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
