import { IDictionaryManager } from 'interfaces/ioverall-config';

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '1',
        title: 'امکان مشاهده لیست قرائت در پیگیری',
        isSelected: true
    },
    {
        id: '1',
        title: 'افزودن رقم قبلی در جزئیات مسیر کارتابل',
        isSelected: true
    },
    {
        id: '2',
        title: 'ناحیه در جستجوی اشتراک اختیاری است',
        isSelected: true
    },
    {
        id: '2',
        title: 'رفع برخی از تغییرات درخواستی',
        isSelected: true
    },
    {
        id: '2',
        title: 'رفع ایرادات جزئی',
        isSelected: true
    }

]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}