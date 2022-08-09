import { IDictionaryManager } from 'interfaces/ioverall-config';

export enum ENLoginVersion {
    version = '0.8.7'
}

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'بهبود عملکرد',
        isSelected: true
    },
    {
        id: '2',
        title: 'تنظیمات کاربری',
        isSelected: true
    }
]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}