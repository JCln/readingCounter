import { IDictionaryManager } from 'interfaces/ioverall-config';

export enum ENLoginVersion {
    version = '0.9.8'
}

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'اطلاعات سیستم',
        isSelected: true
    },
    {
        id: '2',
        title: 'خلاصه کارکرد کاربر',
        isSelected: true
    },
]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}