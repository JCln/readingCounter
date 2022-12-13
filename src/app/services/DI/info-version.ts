import { IDictionaryManager } from 'interfaces/ioverall-config';

export enum ENLoginVersion {
    version = '0.9.5'
}

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'آپلود تصویر',
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