import { IDictionaryManager } from 'interfaces/ioverall-config';

export enum ENLoginVersion {
    version = '0.9.95'
}

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'برخی تغییرات جزئی',
        isSelected: true
    },
    {
        id: '2',
        title: 'بهبود عملکرد برنامه',
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