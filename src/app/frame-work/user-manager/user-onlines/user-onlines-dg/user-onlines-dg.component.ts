import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IToastColor } from 'interfaces/inon-manage';
import { ENToastColors } from 'interfaces/ioverall-config';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'services/message.service';
import { UsersAllService } from 'services/users-all.service';

@Component({
  selector: 'app-user-onlines-dg',
  templateUrl: './user-onlines-dg.component.html',
  styleUrls: ['./user-onlines-dg.component.scss']
})
export class UserOnlinesDgComponent implements OnInit {
  colors: IToastColor[];

  toastMessageReq = {
    userId: '',
    title: '',
    text: '',
    color: ENToastColors.info,
  };


  constructor(
    public config: DynamicDialogConfig,
    private userService: UsersAllService,
    public messageService: MessageService
  ) { }

  classWrapper = async () => {
    const a = this.config.data._data;
    this.toastMessageReq.userId = a.userId;

    this.colors = this.messageService.getToastColors();
    console.log(this.colors);

  }
  ngOnInit(): void {
    this.classWrapper();
  }
  postDataSource = async () => {
    if (this.messageService.verificationDirectMessage(this.toastMessageReq)) {
      const a = await this.userService.postDataSource(ENInterfaces.signalRNotifDirectText, this.toastMessageReq);
      if (a)
        this.userService.snackBarMessageSuccess(a);
    }
  }

}
