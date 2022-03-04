import { IDictionaryManager } from 'interfaces/ioverall-config';

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'لیست قرائت',
        isSelected: true
    },    
    {
        id: '2',
        title: 'نوبتی',
        isSelected: true
    },    
    {
        id: '2',
        title: 'گزارش های پویا',
        isSelected: true
    },    
]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}