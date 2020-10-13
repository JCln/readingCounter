import { Component, OnInit } from '@angular/core';

import { IColor, ITime } from './../../Interfaces/imessage';
import { MessageService } from './../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  colors: IColor[] = [];
  times: ITime[] = [];

  constructor(readonly messageService: MessageService) { }

  ngOnInit(): void {
    this.times = this.messageService.getTimes();
    this.colors = this.messageService.getColors();
  }

  // checkMessageText = () => {
  // }
  logTheMessage = () => {
    console.log(this.messageService.message);
  }

}
