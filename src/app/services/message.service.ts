import { Injectable } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { IMessage } from 'interfaces/inon-manage';
import { ENSnackBarColors, ENSnackBarTimes } from 'interfaces/ioverall-config';
import { UtilsService } from 'services/utils.service';
import { MathS } from 'src/app/classes/math-s';

import { broadcastMessages, colors, times } from './DI/messages';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: IMessage = {
    title: '',
    message: '',
    color: '',
    showTime: 0,
    canSave: true
  };

  constructor(
    private utilsService: UtilsService
  ) { }

  getTimes = () => { return times; }

  getMessages = () => { return broadcastMessages; }

  getColors = () => { return colors; }

  verificationBroadcastMessage = (body: IMessage) => {
    if (MathS.isNull(body.title)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_title);
      return false;
    }
    if (MathS.isNull(body.message)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_text);
      return false;
    }
    if (MathS.isNull(body.showTime)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_showTime);
      return false;
    }
    if (MathS.isNull(body.color)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_colorName);
      return false;
    }
    return true;
  }
  setColor = (color: string) => {
    this.message.color = color;
  }
  setTime = (showTime: number) => {
    this.message.showTime = showTime;
  }
  setText = (text: string) => {
    this.message.message = text;
  }
  showSnack = (message: string, color: ENSnackBarColors) => {
    this.utilsService.snackBarMessage(message, ENSnackBarTimes.fourMili, color);
  }

}
