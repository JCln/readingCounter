import { IDictionaryManager } from 'interfaces/ioverall-config';

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'امکانات جدید داشبورد',
        isSelected: true
    },
    {
        id: '2',
        title: 'بخش های گالری، کارکرد بارگذاری، نمایش با رقم قبلی، و دیگر امکانات',
        isSelected: true
    },
    {
        id: '2',
        title: 'رفع برخی ایرادات',
        isSelected: true
    },
    {
        id: '2',
        title: 'بهبود عملکرد برنامه',
        isSelected: true
    },
]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}