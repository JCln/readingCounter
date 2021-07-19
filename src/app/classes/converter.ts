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
        let temp = str;
        if (temp == null || typeof temp === 'undefined' || !temp) return;
        const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
        for (let i = 0; i < 10; i++) {
            temp = temp.replace(persianNumbers[i], i);
        }
        console.log(temp);
        console.log(temp.toString());

        if (temp === 'undefined')
            return str;
        return temp;
    }
}
