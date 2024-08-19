import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { UtilsService } from 'services/utils.service';

@Component({
  selector: 'app-tag-dialog',
  templateUrl: './tag-dialog.component.html',
  styleUrls: ['./tag-dialog.component.scss']
})
export class TagDialogComponent implements OnInit {
  dataSource;
  tags: any[] = [];
  list: any[] = [];

  constructor(
    public config: DynamicDialogConfig,
    private utilsService: UtilsService,
    public ref: DynamicDialogRef,
    private dictionaryWrapperService: DictionaryWrapperService
  ) { }

  addToList = async (item) => {

    this.list.push(item);
    console.log(item);
  }
  classWrapper = async () => {
    this.dataSource = this.config.data._data ? this.config.data._data : '';
    this.tags = await this.dictionaryWrapperService.getTagDictionary(false);
    console.log(this.tags);

  }
  ngOnInit(): void {
    this.classWrapper();
  }
  close() {
    this.ref.close(this.list);
  }
}
