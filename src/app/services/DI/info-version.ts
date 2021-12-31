import { IDictionaryManager } from 'interfaces/ioverall-config';

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'ثبت کیفیت تصاویر',
        isSelected: true
    },
    {
        id: '2',
        title: 'بهبود بخش بازدید',
        isSelected: true
    },
    {
        id: '2',
        title: 'توصیف تصاویر',
        isSelected: true
    }   
]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}