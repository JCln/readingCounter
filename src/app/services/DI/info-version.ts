import { IDictionaryManager } from 'interfaces/ioverall-config';

export enum ENLoginVersion {
    version = '0.9.96'
}

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'نوبتی',
        isSelected: true
    },
    {
        id: '2',
        title: 'بهبود عملکرد برنامه',
        isSelected: true
    },
    {
        id: '2',
        title: 'کاربران آنلاین',
        isSelected: true
    }

]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}