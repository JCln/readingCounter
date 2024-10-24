import { IDictionaryManager } from 'interfaces/ioverall-config';

export class Converter {
    static convertIdsToTitles = <T>(dataSource: T[], dictionaries: object, toConvert: object): T[] => {
        for (let dictionaryIndex = 0; dictionaryIndex < Object.keys(dictionaries).length; dictionaryIndex++) {
            let objectValue = Object.values(dictionaries)[dictionaryIndex];
            let toConvertTemp = Object.keys(toConvert)[dictionaryIndex];

            for (let index = 0; index < dataSource.length; index++) {
                for (let j = 0; j < objectValue.length; j++) {
                    if (objectValue[j]['id'] == dataSource[index][toConvertTemp]) {
                        dataSource[index][toConvertTemp] = objectValue[j]['title'];
                    }
                }
            }
        }
        return dataSource;
    }
    static convertIdsToTitlesByIdname = <T>(dataSource: T[], dictionaries: object, toConvert: object, idName: string): T[] => {
        for (let dictionaryIndex = 0; dictionaryIndex < Object.keys(dictionaries).length; dictionaryIndex++) {
            let objectValue = Object.values(dictionaries)[dictionaryIndex];
            let toConvertTemp = Object.keys(toConvert)[dictionaryIndex];

            for (let index = 0; index < dataSource.length; index++) {
                for (let j = 0; j < objectValue.length; j++) {
                    if (objectValue[j][idName] == dataSource[index][toConvertTemp]) {
                        dataSource[index][toConvertTemp] = objectValue[j]['title'];
                    }
                }
            }
        }
        return dataSource;
    }
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
    static convertTitleToIdByName = (name: any, dictionary: IDictionaryManager[]): any => {
        return dictionary.find(dictionary => {
            if (dictionary.title == name)
                return dictionary.id;
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
                return items;
        })
    }
    static customizeSelectedOptionsId = (_selectCols: any): number[] => {
        let selecties: number[] = [];
        for (let index = 0; index < _selectCols.length; index++) {
            if (_selectCols[index].isSelected)
                selecties.push(_selectCols[index].id)
        }
        return selecties;
    }
}
