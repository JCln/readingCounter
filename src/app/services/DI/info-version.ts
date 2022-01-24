import { IDictionaryManager } from 'interfaces/ioverall-config';

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'مسیرهای خودکار',
        isSelected: true
    },
    {
        id: '2',
        title: 'سامانه لحظه ',
        isSelected: true
    },
    {
        id: '2',
        title: 'تم',
        isSelected: true
    },
]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}