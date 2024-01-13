import { Injectable } from '@angular/core';

export interface IOnOffLoadNessessities {
  GUid: string,
  listNumber: string,
  trackNumber: number,
  trackNumberOrGroupId?: string, // for lazy offloaded lists
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
    zoneTitle: '',
    zoneId: null
  };
  modifyLists_pageSign: IOnOffLoadNessessities = {
    GUid: null,
    listNumber: null,
    trackNumber: null,
    zoneTitle: ''
  };
  generalModifyLists_pageSign: IOnOffLoadNessessities = {
    GUid: null,
    listNumber: null,
    groupId: '',
    zoneId: null,
    zoneTitle: '',
    trackNumber: null
  };
  generalModifyListsGrouped_pageSign: IOnOffLoadNessessities = {
    GUid: null,
    listNumber: null,
    groupId: '',
    zoneId: null,
    trackNumber: null,
    zoneTitle: ''
  };
  offloadedListLazy_pageSign: IOnOffLoadNessessities = {
    GUid: null,
    listNumber: null,
    groupId: '',
    zoneId: null,
    trackNumber: null,
    trackNumberOrGroupId: '',
    zoneTitle: ''
  };
  offloadedListAllInGroupLazy_pageSign: IOnOffLoadNessessities = {
    GUid: null,
    listNumber: null,
    groupId: '',
    zoneId: null,
    trackNumber: null,
    trackNumberOrGroupId: '',
    zoneTitle: ''
  };

}
