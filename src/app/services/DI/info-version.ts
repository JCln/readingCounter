import { IDictionaryManager } from 'interfaces/ioverall-config';

export enum ENLoginVersion {
    version = '0.8.5'
}

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'اصلاح لیست(دسته ای)',
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