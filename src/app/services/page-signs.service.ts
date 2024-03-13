import { Injectable } from '@angular/core';

export interface IPerdayNessessities {
  trackNumber: number,
  zone: string,
}
export interface IOnOffLoadNessessities {
  GUid: string,
  listNumber: string,
  trackNumber?: number,
  trackNumberOrGroupId?: string, // for lazy offloaded lists
  groupId?: string,
  zoneId?: number,
  zoneTitle?: string,
  routeCount?: number // for all in group lazy list
  prePage?: string // for all list component
}

@Injectable({
  providedIn: 'root'
})
export class PageSignsService {

  perday_pageSign: IPerdayNessessities = {
    trackNumber: null,
    zone: null,
  };
  simafaSingle_pageSign = {
    UUID: '',
    zoneId: null,
    year: null,
    readingPeriodId: null,
    _canShowAddButton: true
  };
  allLists_pageSign: IOnOffLoadNessessities = {
    GUid: null,
    listNumber: null,
    trackNumber: null,
    zoneTitle: '',
    zoneId: null,
    prePage: ''
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
  masterByFragmentLazy_pageSign: IOnOffLoadNessessities = {
    GUid: null,
    listNumber: null,
    groupId: '',
    zoneId: null,
    trackNumber: null,
    trackNumberOrGroupId: '',
    zoneTitle: ''
  };
  masterByFragmentAllInGroupLazy_pageSign: IOnOffLoadNessessities = {
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
    zoneTitle: '',
    routeCount: null
  };
  clientManager_pageSign = {
    id: null
  };
  assessPre_pageSign = {
    GUid: null,
    listNumber: '',
    zoneId: null,
    isFromSource: false
  };
}
