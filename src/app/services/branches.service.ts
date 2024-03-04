import { Injectable } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  constructor(
    public utilsService: UtilsService
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
