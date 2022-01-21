import { EN_messages } from 'interfaces/enums.enum';
import { IColor, IMessage, ITime } from 'interfaces/inon-manage';
import { ENRandomNumbers } from 'interfaces/ioverall-config';

export const broadcastMessages: IMessage[] = [
    { title: EN_messages.broadTitle1, message: EN_messages.broadMessage1, color: '#116FFF', showTime: ENRandomNumbers.five, canSave: true },
    { title: EN_messages.broadTitle2, message: EN_messages.broadMessage2, color: '#069D51', showTime: ENRandomNumbers.ten, canSave: true },
    { title: EN_messages.broadTitle3, message: EN_messages.broadMessage3, color: '#F68038', showTime: ENRandomNumbers.thirdy, canSave: true }
]

export const times: ITime[] = [
    { value: 5, isClicked: false },
    { value: 10, isClicked: false },
    { value: 15, isClicked: false },
    { value: 20, isClicked: false }
]

export const colors: IColor[] = [
    { value: 'آبی', isClicked: false, background: ' #116FFF' },
    { value: 'سبز', isClicked: false, background: '#069D51' },
    { value: 'نارنجی', isClicked: false, background: '#F68038' },
    { value: 'قرمز', isClicked: false, background: '#f63e38' }
]