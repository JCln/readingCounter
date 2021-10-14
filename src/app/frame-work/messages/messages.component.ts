import { Component } from '@angular/core';
import { IColor, IMessage, ITime } from 'interfaces/inon-manage';
import { BrowserStorageService } from 'services/browser-storage.service';
import { MessageService } from 'services/message.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent extends FactoryONE {
  message: IMessage = {
    title: '',
    text: '',
    color: '',
    showTime: 0,
    canSave: true
  };
  colors: IColor[] = [];
  times: ITime[] = [];
 

  testNamesStorage: any;
  allMessages: IMessage[];
  getedDataFromLocalStorage: any;

  constructor(
     
    readonly messageService: MessageService,
    private browserStorageService: BrowserStorageService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
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
  // for now for get all the browserstorage messages
  getAllPreMessages = () => {
    this.allMessages = this.browserStorageService.getAll();
    console.log(this.allMessages);

  }
  getMessages = (name: string) => {
    this.getedDataFromLocalStorage = this.browserStorageService.get(name);
  }
  removeItem = (localStorageItem: IMessage) => {
    console.log(localStorageItem);
    this.browserStorageService.removeLocal(localStorageItem.title);
  }
  clearAllStorage = () => {
    this.browserStorageService.removeAll();
  }
  copyPreMessageToCurrent = (localStorageItem: IMessage) => {
    this.message.title = localStorageItem.title;
    this.message.color = localStorageItem.color;
    this.message.showTime = localStorageItem.showTime;
    this.message.text = localStorageItem.text;
    this.message.canSave = localStorageItem.canSave;

  }
}
