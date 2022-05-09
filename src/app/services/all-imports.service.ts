import { Injectable } from '@angular/core';
import { IImportSimafaBatchReq } from 'interfaces/import-data';

@Injectable({
  providedIn: 'root'
})
export class AllImportsService {

  allImports_batch: IImportSimafaBatchReq = {
    routeAndReaderIds: [{ routeId: null, counterReaderId: null }],
    canContinue: false,
    fromEshterak: '',
    id: '',
    listNumber: '',
    readingPeriodId: null,
    toEshterak: '',
    year: 1401,
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

