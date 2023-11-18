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
    _isCollapsedGuilsWithParams: boolean = false;
    _isCollapsedUsersLogins: boolean = false;
    _isCollapsedIpFilterGetBlocked: boolean = false;    
    _isCollapsedAuthenticityAttempts: boolean = false;    
    _isCollapsedIpFilterGetInvalidTime: boolean = false;    
    _isCollapsedNotificationListByDate: boolean = false;
    _isCollapsedDownloadAttempts: boolean = false;
    _isCollapsedGetUploaded: boolean = false;
    _isCollapsedUploadAttempts: boolean = false;    
    isCollapsedUserKarkard: boolean = false;
    isCollapsedImageAttrFileResult: boolean = false;
    _isCollapsedFeedbackC: boolean = false;
    _isCollapsedFeedbackS: boolean = false;
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
    _userActivation: boolean = false;
    _isCollapsedKarkard: boolean = false;
    _isCollapsedAnalyzePrfm: boolean = false;
    _isCollapsedForbiddenByType: boolean = false;
}
