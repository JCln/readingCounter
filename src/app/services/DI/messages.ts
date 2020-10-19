import { IColor, IMessage, ITime } from './../../Interfaces/imessage';

export const messages: IMessage[] = [
    { title: '', text: '', color: '', showTime: 0, canSave: true }
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
