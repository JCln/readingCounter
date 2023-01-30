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
  object = {
    userId: '',
    title: '',
    text: '',
    color: ''
  };

  constructor(
    public config: DynamicDialogConfig,
    private userService: UsersAllService,
    private messageService: MessageService
  ) { }

  classWrapper = async () => {
    const a = this.config.data._data;
    this.object.userId = a.userId;
    this.getColors();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  postDataSource = () => {
    if (!this.object.color)
      this.object.color = this.colors[0].value;

    this.userService.postDataSource(ENInterfaces.signalRNotifDirectText, this.object);
  }
  getColors = () => { this.colors = this.messageService.getColors(); }
}
