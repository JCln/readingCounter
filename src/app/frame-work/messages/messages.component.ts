import { Component, OnInit } from '@angular/core';
import { BrowserStorageService } from 'src/app/sevices/browser-storage.service';

import { IColor, IMessage, ITime } from './../../Interfaces/imessage';
import { MessageService } from './../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  message: IMessage = {
    title: '',
    text: '',
    color: '',
    showTime: 0,
    canSave: true
  };
  colors: IColor[] = [];
  times: ITime[] = [];

  getedDataFromLocalStorage: any;
  allMessages: IMessage;

  constructor(readonly messageService: MessageService, private browserStorageService: BrowserStorageService) { }

  ngOnInit(): void {
    this.times = this.messageService.getTimes();
    this.colors = this.messageService.getColors();
    this.getAllPreMessages();
  }

  connectToServerConfig = (name: string, message: IMessage) => {
    console.log(this.message);
  }
  saveNewMessageForm = (name: string, message: IMessage) => {
    if (message.canSave)
      this.browserStorageService.set(name, message);
    else
      this.connectToServerConfig(name, message);
  }
  getMessages = (name: string) => {
    this.getedDataFromLocalStorage = this.browserStorageService.get(name);
  }
  // for now for get all the browserstorage messages
  getAllPreMessages = () => {
    this.allMessages = this.browserStorageService.getAll();
    console.log(this.allMessages);

  }
  clearAllStorage = () => {
    this.browserStorageService.removeAll();
  }
  copyPreMessageToCurrent = (name: string) => {
    // console.log(this.browserStorageService.get(name));
    this.message = this.browserStorageService.get(name);
  }


}
