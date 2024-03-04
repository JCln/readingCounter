import { Injectable } from '@angular/core';
import { MathS } from '../classes/math-s';
import { IBranchState } from 'interfaces/i-branch';
import { EN_messages } from 'interfaces/enums.enum';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class BranchesVerificationService {

  constructor(
    private utilsService: UtilsService
  ) { }

  stateVerification = (dataSource: IBranchState): boolean => {
    if (MathS.isNull(dataSource.title)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_title);
      return false;
    }
    return true;
  }
}
