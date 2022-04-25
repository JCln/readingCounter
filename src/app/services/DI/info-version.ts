import { IDictionaryManager } from 'interfaces/ioverall-config';

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'اصلاح لیست',
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