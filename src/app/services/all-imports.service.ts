import { Injectable } from '@angular/core';
import { IImportSimafaBatchReq } from 'interfaces/import-data';

import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class AllImportsService {
  constructor(private utilsService: UtilsService) { }

  allImports_batch: IImportSimafaBatchReq = {
    routeAndReaderIds: [{ routeId: null, counterReaderId: null }],
    canContinue: false,
    fromEshterak: '',
    id: '',
    listNumber: '',
    readingPeriodId: null,
    toEshterak: '',
    year: this.utilsService.getFirstYear(),
    zoneId: null,
    fragmentMasterId: '',
    alalHesabPercent: 5,
    imagePercent: 5,
    readingProgramId: '',
    hasPreNumber: false,
    displayBillId: false,
    displayRadif: false,
  };

}

