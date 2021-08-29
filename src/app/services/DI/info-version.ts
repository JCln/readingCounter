import { IDictionaryManager } from 'interfaces/ioverall-config';

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '1',
        title: 'آخرین تغییر 1آخرین تغییر',
        isSelected: true
    },
    {
        id: '2',
        title: 'آخرین 2',
        isSelected: true
    },
    {
        id: '3',
        title: 'تست متن 3',
        isSelected: true
    }

]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}