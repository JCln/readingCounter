import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IColor, IMessage, ITime } from 'interfaces/inon-manage';
import { MessageService } from 'services/message.service';
import { SignalRService } from 'services/signal-r.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent extends FactoryONE {
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
    if (this.messageService.verificationBroadcastMessage(this.messageService.message)) {
      this.signalRService.sendBroadcastMessage(ENInterfaces.signalRBroadcastMessage, this.messageService.message);
    }
  }
  classWrapper = async (canRefresh?: boolean) => {
    this.times = this.messageService.getTimes();
    this.colors = this.messageService.getToastColors();
    this.allMessages = this.messageService.getMessages();
  }
  copyPreMessageToCurrent = (name: IMessage) => {
    this.messageService.message = name;
  }
}
