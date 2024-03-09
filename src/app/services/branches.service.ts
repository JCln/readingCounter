import { Injectable } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { UtilsService } from './utils.service';
import { ColumnManager } from '../classes/column-manager';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  constructor(
    public utilsService: UtilsService,
    public columnManager: ColumnManager
  ) { }

  firstConfirmDialog = (text: string): Promise<any> => {
    const a = {
      messageTitle: EN_messages.confirm_remove,
      text: text,
      minWidth: '19rem',
      isInput: false,
      isDelete: true,
      icon: 'pi pi-trash'
    }
    return this.utilsService.firstConfirmDialog(a);
  }

}
