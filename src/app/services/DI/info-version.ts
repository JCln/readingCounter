import { IDictionaryManager } from 'interfaces/ioverall-config';

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'اصلاح لیست',
        isSelected: true
    },
    {
        id: '2',
        title: 'مدیا',
        isSelected: true
    },
    {
        id: '2',
        title: 'جستجو تجمیعی و مشترک',
        isSelected: true
    }
]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}