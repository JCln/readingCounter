import { IDictionaryManager } from 'interfaces/ioverall-config';

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'اصلاح لیست(دسته ای)',
        isSelected: true
    },
    {
        id: '2',
        title: 'جستجوی تجمیعی',
        isSelected: true
    }
]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}