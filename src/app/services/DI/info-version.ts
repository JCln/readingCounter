import { IDictionaryManager } from 'interfaces/ioverall-config';

export enum ENLoginVersion {
    version = '0.9.94'
}

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'کاربران آنلاین',
        isSelected: true
    },
    {
        id: '2',
        title: 'تنظیمات کاربری',
        isSelected: true
    },
    {
        id: '2',
        title: 'کارتابل',
        isSelected: true
    }
    
]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}