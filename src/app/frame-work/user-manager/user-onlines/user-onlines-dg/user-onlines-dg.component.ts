import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IColor } from 'interfaces/inon-manage';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'services/message.service';
import { UsersAllService } from 'services/users-all.service';

@Component({
  selector: 'app-user-onlines-dg',
  templateUrl: './user-onlines-dg.component.html',
  styleUrls: ['./user-onlines-dg.component.scss']
})
export class UserOnlinesDgComponent implements OnInit {
  colors: IColor[] = [];

  constructor(
    public config: DynamicDialogConfig,
    private userService: UsersAllService,
    public messageService: MessageService
  ) { }

  getColors = () => {
    this.colors = this.messageService.getToastColors();
  }
  classWrapper = async () => {
    const a = this.config.data._data;
    this.messageService.toastMessageReq.userId = a.userId;
    this.getColors();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  postDataSource = async () => {
    if (this.messageService.verificationDirectMessage(this.messageService.toastMessageReq)) {
      const a = await this.userService.postDataSource(ENInterfaces.signalRNotifDirectText, this.messageService.toastMessageReq);
      if (a)
        this.userService.snackBarMessageSuccess(a);
    }
  }
}
