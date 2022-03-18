import { Injectable } from '@angular/core';

export interface IOnOffLoadNessessities {
  GUid: string,
  listNumber: string,
  groupId?: string
  zoneId?: number
}
@Injectable({
  providedIn: 'root'
})
export class AllListsService {

  allLists_pageSign: IOnOffLoadNessessities = {
    GUid: null,
    listNumber: null
  };
  modifyLists_pageSign: IOnOffLoadNessessities = {
    GUid: null,
    listNumber: null
  };
  generalModifyLists_pageSign: IOnOffLoadNessessities = {
    GUid: null,
    listNumber: null,
    groupId: '',
    zoneId: null
  };

}
