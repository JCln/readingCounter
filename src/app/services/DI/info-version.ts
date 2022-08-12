import { IDictionaryManager } from 'interfaces/ioverall-config';

export enum ENLoginVersion {
    version = '0.8.8'
}

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'لیست',
        isSelected: true
    },
    {
        id: '2',
        title: 'تم',
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