import { IDictionaryManager } from 'interfaces/ioverall-config';

export enum ENLoginVersion {
    version = '0.9.3'
}

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'صدور لیست excel',
        isSelected: true
    },
]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}