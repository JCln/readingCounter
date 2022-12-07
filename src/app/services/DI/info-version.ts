import { IDictionaryManager } from 'interfaces/ioverall-config';

export enum ENLoginVersion {
    version = '0.9.4'
}

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'کارکرد نوبتی',
        isSelected: true
    },
    {
        id: '2',
        title: 'نتیجه پایش',
        isSelected: true
    },
]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}