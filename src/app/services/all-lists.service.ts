import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AllListsService {

  allLists_pageSign = {
    GUid: null,
    listNumber: null
  };
  modifyLists_pageSign = {
    GUid: null,
    listNumber: null
  };

}
