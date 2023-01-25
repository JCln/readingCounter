import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IColor, IMessage, ITime } from 'interfaces/inon-manage';
import { ENSnackBarColors } from 'interfaces/ioverall-config';
import { MessageService } from 'services/message.service';
import { SignalRService } from 'services/signal-r.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent extends FactoryONE {
  newMessage: IMessage = {
    title: '',
    message: '',
    color: ENSnackBarColors.info,
    seconds: 0,
    canSave: true
  };
  colors: IColor[] = [];
  times: ITime[] = [];
  allMessages: IMessage[];

  constructor(
    readonly messageService: MessageService,
    private signalRService: SignalRService
  ) {
    super();
  }

  connectToServer = async () => {
    if (this.messageService.verificationBroadcastMessage(this.newMessage)) {
      this.signalRService.sendBroadcastMessage(ENInterfaces.signalRBroadcastMessage, this.newMessage);
    }
  }
  classWrapper = async (canRefresh?: boolean) => {
    this.times = this.messageService.getTimes();
    this.colors = this.messageService.getColors();
    this.allMessages = this.messageService.getMessages();
  }
  copyPreMessageToCurrent = (name: IMessage) => {
    this.newMessage.title = name.title;
    this.newMessage.color = name.color;
    this.newMessage.seconds = name.seconds;
    this.newMessage.message = name.message;
    this.newMessage.canSave = name.canSave;

  }
}
