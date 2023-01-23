import { Injectable } from '@angular/core';

export interface IOnOffLoadNessessities {
  GUid: string,
  listNumber: string,
  trackNumber: number,
  groupId?: string,
  zoneId?: number,
  zoneTitle?: string
}
@Injectable({
  providedIn: 'root'
})
export class AllListsService {

  allLists_pageSign: IOnOffLoadNessessities = {
    GUid: null,
    listNumber: null,
    trackNumber: null,
    zoneTitle: ''
  };
  modifyLists_pageSign: IOnOffLoadNessessities = {
    GUid: null,
    listNumber: null,
    trackNumber: null
  };
  generalModifyLists_pageSign: IOnOffLoadNessessities = {
    GUid: null,
    listNumber: null,
    groupId: '',
    zoneId: null,
    trackNumber: null
  };
  generalModifyListsGrouped_pageSign: IOnOffLoadNessessities = {
    GUid: null,
    listNumber: null,
    groupId: '',
    zoneId: null,
    trackNumber: null
  };

}
