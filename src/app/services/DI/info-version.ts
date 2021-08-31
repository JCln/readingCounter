import { IDictionaryManager } from 'interfaces/ioverall-config';

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '1',
        title: 'افزودن رقم قبلی در جزئیات مسیر کارتابل',
        isSelected: true
    },
    {
        id: '2',
        title: 'پیام هشدار یا خطا هنگام بروز نبودن نسخه مرورگر',
        isSelected: true
    },
    {
        id: '3',
        title: 'بهبود ظاهر برنامه در جداول، سرتیتر برنامه، مدیریت کاربران و ..',
        isSelected: true
    }

]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}