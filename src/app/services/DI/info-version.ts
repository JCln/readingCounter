import { IDictionaryManager } from 'interfaces/ioverall-config';

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'گزارش ساز اکسل',
        isSelected: true
    },        
    {
        id: '2',
        title: 'مکانمند شدن جستجوها و لیست',
        isSelected: true
    },        
]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}