import { Component, OnInit } from '@angular/core';

import { MessageService } from './../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  colors: string[] = ['آبی', 'سبز', 'نارنجی', 'قرمز'];
  times: any[] = [
    { value: 5, isClicked: false },
    { value: 10, isClicked: false },
    { value: 15, isClicked: false }
  ];

  constructor(readonly messageService: MessageService) { }

  ngOnInit(): void {
  }

  // checkMessageText = () => {
  // }
  logTheMessage = () => {
    console.log(this.messageService.message);
  }

}
