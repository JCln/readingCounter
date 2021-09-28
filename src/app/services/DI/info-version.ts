import { IDictionaryManager } from 'interfaces/ioverall-config';

export const infoVersionItems: IDictionaryManager[] = [    
    {
        id: '2',
        title: 'ایجاد بخش های ویرایش گروهی و آنالیز',
        isSelected: true
    },
    {
        id: '2',
        title: 'بهبود نحوه نمایش برروی نقشه ',
        isSelected: true
    },
    {
        id: '2',
        title: 'اصلاح مشکل تاریخ',
        isSelected: true
    },
    {
        id: '2',
        title: 'دانلود عکس بطور خودکار',
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