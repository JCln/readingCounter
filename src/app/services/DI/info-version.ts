import { IDictionaryManager } from 'interfaces/ioverall-config';

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'تم',
        isSelected: true
    },
    {
        id: '2',
        title: 'بهبود عملکرد برنامه',
        isSelected: true
    }

]
export class infoVersion {
    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}