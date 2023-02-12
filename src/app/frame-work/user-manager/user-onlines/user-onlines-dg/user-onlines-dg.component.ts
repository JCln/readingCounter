import { Component, OnInit } from '@angular/core';
import { IToastColor } from 'interfaces/inon-manage';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'services/message.service';
import { UsersAllService } from 'services/users-all.service';

@Component({
  selector: 'app-user-onlines-dg',
  templateUrl: './user-onlines-dg.component.html',
  styleUrls: ['./user-onlines-dg.component.scss']
})
export class UserOnlinesDgComponent implements OnInit {
  colorsT: IToastColor[];
  selectedColor: any;

  constructor(
    public config: DynamicDialogConfig,
    private userService: UsersAllService,
    public messageService: MessageService
  ) { }

  classWrapper = async () => {
    const a = this.config.data._data;
    this.messageService.toastMessageReq.userId = a.userId;

    this.colorsT = this.messageService.getToastColors();
    console.log(this.colorsT);

  }
  ngOnInit(): void {
    this.classWrapper();
  }
  postDataSource = async () => {
    console.log(this.selectedColor);
    console.log(this.messageService.toastMessageReq);

    // if (this.messageService.verificationDirectMessage(this.messageService.toastMessageReq)) {
    //   const a = await this.userService.postDataSource(ENInterfaces.signalRNotifDirectText, this.messageService.toastMessageReq);
    //   if (a)
    //     this.userService.snackBarMessageSuccess(a);
    // }
  }
  // html ngModel for color not working so this function written
  changeColor = (color: any) => {
    console.log(color);

    // this.messageService.toastMessageReq.color = color;
  }
}
