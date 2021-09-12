import { IDictionaryManager } from 'interfaces/ioverall-config';

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'تغییر ظاهر در ویرایش صادر شده ها',
        isSelected: true
    },
    {
        id: '2',
        title: 'نمایش و ویرایش بهتر اصلاح لیست',
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