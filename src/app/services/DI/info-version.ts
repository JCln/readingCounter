import { IDictionaryManager } from 'interfaces/ioverall-config';

export const infoVersionItems: IDictionaryManager[] = [
    {
        id: '2',
        title: 'درخواست های داشبورد',
        isSelected: true
    },
    {
        id: '2',
        title: 'جستجوی پیشرفته کاربران',
        isSelected: true
    },
    {
        id: '2',
        title: 'نقشه در لیست',
        isSelected: true
    },
    {
        id: '2',
        title: 'نقشه در غیرمجاز',
        isSelected: true
    },
    {
        id: '2',
        title: 'سامانه لحظه ',
        isSelected: true
    },
    {
        id: '2',
        title: 'تم',
        isSelected: true
    },
]
export class infoVersion {

    static getInfoItems = (): IDictionaryManager[] => {
        return infoVersionItems;
    }
}