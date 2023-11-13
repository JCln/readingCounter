import { Component, OnInit } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { IBatchModifyRes } from 'interfaces/inon-manage';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-general-group-info-res',
  templateUrl: './general-group-info-res.component.html',
  styleUrls: ['./general-group-info-res.component.scss']
})
export class GeneralGroupInfoResComponent implements OnInit {
  data: IBatchModifyRes;
  title: string = EN_messages.abbrMessage;
  errorDesc: string = '';
  readonly successMessageSingle: string = EN_messages.doneSingleListModify;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
    this.data = this.config.data;
    console.log(this.data);

    if (this.data.isLatestInfo) {
      this.title = EN_messages.abbrMessageLatestInfo;
      this.errorDesc = this.data.detailsInfo[0].errorDescription;
    }
    console.log(this.data);
  }

}
