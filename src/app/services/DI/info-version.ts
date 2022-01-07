import { IDictionaryManager } from 'interfaces/ioverall-config';

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'داشبورد منطقه ای',
        isSelected: true
    },
    {
        id: '2',
        title: 'چارت کیفیت تصاویر',
        isSelected: true
    },
    {
        id: '2',
        title: 'گزارش وضعیت کنتور',
        isSelected: true
    }
]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}