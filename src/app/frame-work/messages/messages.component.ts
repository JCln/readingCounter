import { Component, OnInit } from '@angular/core';

import { MessageService } from './../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  colors: string[] = ['آبی', 'سبز', 'نارنجی', 'قرمز'];
  times: number[] = [5, 10, 15, 20];

  constructor(readonly messageService: MessageService) { }

  ngOnInit(): void {
  }

  // checkMessageText = () => {
  // }
  logTheMessage = () => {
    console.log(this.messageService.message);
  }

}
