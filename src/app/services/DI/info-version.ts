import { IDictionaryManager } from 'interfaces/ioverall-config';

export enum ENLoginVersion {
    version = '0.9.97'
}

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'برخی تغییرات جزئی',
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