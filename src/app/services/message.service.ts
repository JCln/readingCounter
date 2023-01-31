import { Injectable } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { IMessage, INotifyDirectImage } from 'interfaces/inon-manage';
import { ENSnackBarColors, ENSnackBarTimes } from 'interfaces/ioverall-config';
import { UtilsService } from 'services/utils.service';
import { MathS } from 'src/app/classes/math-s';

import { broadcastMessages, colors, times, toastColors } from './DI/messages';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: IMessage = {
    title: '',
    message: '',
    color: ENSnackBarColors.info,
    seconds: 0,
    canSave: true
  };
  toastMessageReq = {
    userId: '',
    title: '',
    text: '',
    color: ''
  };
  toastImageWithCaptionReq: INotifyDirectImage = {
    file: '',
    userId: '',
    caption: ''
  };


  constructor(
    private utilsService: UtilsService,
  ) { }

  getTimes = () => { return times; }

  getMessages = () => { return broadcastMessages; }

  getColors = () => { return colors; }
  getToastColors = () => { return toastColors; }

  verificationBroadcastMessage = (body: IMessage) => {
    if (MathS.isNull(body.title)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_title);
      return false;
    }
    if (MathS.isNull(body.message)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_text);
      return false;
    }
    if (MathS.isNull(body.seconds)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_showTime);
      return false;
    }
    if (MathS.isNull(body.color)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_colorName);
      return false;
    }
    return true;
  }
  verificationDirectMessage = (body: any) => {
    if (MathS.isNull(body.title)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_title);
      return false;
    }
    if (MathS.isNull(body.text)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_text);
      return false;
    }
    if (MathS.isNull(body.color)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_colorName);
      return false;
    }
    return true;
  }
  setColor = (color: ENSnackBarColors) => {
    this.message.color = color;
  }
  setTime = (showTime: number) => {
    this.message.seconds = showTime;
  }
  setText = (text: string) => {
    this.message.message = text;
  }
  showSnack = (message: string, color: ENSnackBarColors) => {
    this.utilsService.snackBarMessage(message, ENSnackBarTimes.fourMili, color);
  }

}
