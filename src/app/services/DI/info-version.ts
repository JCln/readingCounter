import { IDictionaryManager } from 'interfaces/ioverall-config';

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
<<<<<<< HEAD
        title: 'بهبود نمایش تصاویر در لیست قرائت',
        isSelected: true
    },    
=======
        title: 'خروجی جداول',
        isSelected: true
    },
    {
        id: '2',
        title: 'ذخیره ستون ها',
        isSelected: true
    },
>>>>>>> DEV
    {
        id: '2',
        title: 'رفع برخی ایرادات',
        isSelected: true
<<<<<<< HEAD
    },    
=======
    },
>>>>>>> DEV
]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}