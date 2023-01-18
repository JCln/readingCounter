import { IDictionaryManager } from 'interfaces/ioverall-config';

export enum ENLoginVersion {
    version = '0.9.9'
}

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'تنظیمات جدول',
        isSelected: true
    },
    {
        id: '2',
        title: 'بهبود عملکرد برنامه',
        isSelected: true
    },
]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}