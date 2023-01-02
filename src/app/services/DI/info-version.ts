import { IDictionaryManager } from 'interfaces/ioverall-config';

export enum ENLoginVersion {
    version = '0.9.7'
}

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'waterMark',
        isSelected: true
    },
    {
        id: '2',
        title: 'بهبود استفاده از تاریخ',
        isSelected: true
    },
]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}