import { IDictionaryManager } from 'interfaces/ioverall-config';

export enum ENLoginVersion {
    version = '0.9.1'
}

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'حافظه- رهگیری درخواست- کارکرد کاربر',
        isSelected: true
    },
    {
        id: '2',
        title: 'بهبود عملکرد',
        isSelected: true
    },
]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}