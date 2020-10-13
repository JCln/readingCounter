import { Injectable } from '@angular/core';

import { IMessage } from '../Interfaces/imessage';
import { colors, times } from './DI/messages';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: IMessage = {
    text: '',
    color: '',
    showTime: 0
  };

  constructor() { }

  getTimes = () => { return times };
  getColors = () => { return colors };

  setColor = (color: string) => {
    this.message.color = color;
  }
  setTime = (showTime: number) => {
    this.message.showTime = showTime;
  }
  setText = (text: string) => {
    this.message.text = text;
  }

}
