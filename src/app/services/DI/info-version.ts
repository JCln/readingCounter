import { IDictionaryManager } from 'interfaces/ioverall-config';

export enum ENLoginVersion {
    version = '0.9.91'
}

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'کاربران آنلاین',
        isSelected: true
    },
    {
        id: '2',
        title: 'خطای صدور',
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