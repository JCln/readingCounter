import { IDictionaryManager } from 'interfaces/ioverall-config';

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '1',
        title: 'افزودن بخش جستجو',
        isSelected: true
    },
    {
        id: '2',
        title: 'رفع مشکل بازگشت به حالت اولیه در غیرمجاز',
        isSelected: true
    },
    {
        id: '2',
        title: 'رفع برخی ایرادات جزئی',
        isSelected: true
    }

]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}