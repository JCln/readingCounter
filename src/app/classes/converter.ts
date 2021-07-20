import { IDictionaryManager } from 'interfaces/ioverall-config';

export class Converter {
    static convertIdToTitle = (dataSource: any, dictionary: IDictionaryManager[], toConvert: string) => {
        dictionary.map(dictionary => {
            dataSource.map(dataSource => {
                if (dictionary.id == dataSource[toConvert])
                    dataSource[toConvert] = dictionary.title;
            })
        });
    }
    static persianToEngNumbers = (str) => {
        if (str == null || typeof str === 'undefined' || !str) return;
        const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
        for (let i = 0; i < 10; i++) {
            str = str.replace(persianNumbers[i], i);
        }
        return str;
    }
}
