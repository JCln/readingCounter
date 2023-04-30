import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class Collapser {
    isCollapsedPrfm: boolean = false;
    isCollapsedDH: boolean = false;
    isCollapsedLocked: boolean = false;
    isCollapsedPreNumberShown: boolean = false;
    isCollapsedOffKarkard: boolean = false;
    isCollapsedMaster: boolean = false;
    isCollapsedDaily: boolean = false;
    isCollapsedKarkard: boolean = false;
    isCollapsedTrv: boolean = false;
    isCollapsedImgAttrAnlz: boolean = false;
    isCollapsedTrvCh: boolean = false;
    isCollapsedDetails: boolean = false;
    isCollapsedUserKarkard: boolean = false;
    isCollapsedImageAttrFileResult: boolean = false;
    _isCollapsedAllImgs: boolean = false;
    _isCollapsedRandomImgCarouDetails: boolean = true;
    _isCollapsedRandomImages: boolean = false;
    _isCollapsedImageAttrDetails: boolean = false;
    _isCollapsedImageAttrGridBased: boolean = false;
    _assessPreCollapse: boolean = false;
    _isCollapsedForbidden: boolean = false;
    _searchProCollapse: boolean = false;
    _searchMoshtarakCollapse: boolean = false;
    isCollapsedCranlz: boolean = false;
    serverError: boolean = false;
}
// utilsService.collapser.
