import { IDictionaryManager } from 'interfaces/ioverall-config';

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'خروجی جداول',
        isSelected: true
    },
    {
        id: '2',
        title: 'ذخیره ستون ها',
        isSelected: true
    },
    {
        id: '2',
        title: 'گالری',
        isSelected: true
    },
    {
        id: '2',
        title: 'رفع برخی ایرادات',
        isSelected: true
    },
]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}