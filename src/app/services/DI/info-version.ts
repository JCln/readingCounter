import { IDictionaryManager } from 'interfaces/ioverall-config';

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '1',
        title: 'تغییر و ویرایش بهتر در اصلاح لیست',
        isSelected: true
    },
    {
        id: '2',
        title: 'رفع ایرادات',
        isSelected: true
    },
    {
        id: '2',
        title: 'برخی امکانات جدید',
        isSelected: true
    }

]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}