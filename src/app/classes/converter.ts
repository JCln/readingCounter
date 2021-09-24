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
    static convertTitleToId = (dataSource: any, dictionary: IDictionaryManager[], toConvert: string): any => {
        dictionary.map(dictionary => {
            dataSource.map(dataSource => {
                if (dictionary.title == dataSource[toConvert])
                    dataSource[toConvert] = dictionary.id;
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
    static customizeSelectedColumns = (_selectCols: any) => {
        return _selectCols.filter(items => {
            if (items.isSelected)
                return items
        })
    }
}
