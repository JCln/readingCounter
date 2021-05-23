import { Injectable } from '@angular/core';

import { IDictionaryManager } from '../Interfaces/ioverall-config';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  constructor() { }

  convertIdToTitle = (dataSource: any, dictionary: IDictionaryManager[], toConvert: string) => {
    dictionary.map(dictionary => {
      dataSource.map(dataSource => {
        if (dictionary.id == dataSource[toConvert])
          dataSource[toConvert] = dictionary.title;
      })
    });
  }
}
