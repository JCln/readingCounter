import { ENEssentialsToSave, ENSnackBarTimes, ENSnackBarColors, ENOffloadModifyType } from "./enums.enum";

export interface ISidebarItems {
    items: [
        {
            title: string;
            cssClass: string;
            logicalOrder: number;
            route: string;
            isOpen: boolean;
            subItems?: [
                {
                    title: string;
                    isClosable: boolean;
                    isRefreshable: boolean;
                    route: string;
                    cssClass: string;
                    logicalOrder: number;
                }
            ]
        }
    ]
}
export interface ISidebarVals {
    readonly id: number,
    req?: ENEssentialsToSave;
    value: ENEssentialsToSave;
    value_2?: ENEssentialsToSave;
    readonly url: string
}
export interface ITabs {
    title: string;
    isClosable: boolean;
    isRefreshable: boolean;
    route: string;
    cssClass: string;
    logicalOrder: number;
}
export interface ITestSidebar {
    routerUrl: string;
    name: string;
    isClosable: boolean;
    isRefreshable: boolean;
    sid_isOpenItems: boolean;
}
export interface IDialogMessage {
    messageTitle: string,
    messageTitleTwo?: string,
    text?: string,
    minWidth: string,
    isInput: boolean,
    inputMinLength?: number,
    placeHolder?: string,
    isDelete: boolean,
    icon: string,
    doesNotReturnButton?: boolean,
    disableClose?: boolean,
    isSelectableDate?: boolean,
    changePassword?: boolean
}
export interface IPrimeConfirmDialog {
    messageTitle: string,
    messageTitleTwo?: string,
    text?: string,
    width: string,
    isInput: boolean,
    icon: string,
    isImportant?: boolean,
    closable?: boolean,
}
export interface ISimafaImportStatus {
    hasSingle: boolean,
    hasBatch: boolean
}
export interface ISnackBar {
    message: string;
    duration: ENSnackBarTimes;
    backColor?: ENSnackBarColors;
}
export interface ISnackBarSignal {
    message: string;
    duration: ENSnackBarTimes;
    backColor?: ENSnackBarColors;
}
export interface IResponses {
    isValid: boolean;
    message: string;
    status: number;
}
export interface ITrueFalseFilter {
    name: string;
    value: string | boolean;
}
export const TrueFalseFilter: ITrueFalseFilter[] = [
    { name: 'نباشد', value: false },
    { name: 'باشد', value: true },
    { name: 'هیچکدام', value: '' }
]
export const ENBrowserInfo = {
    Chrome: { title: 'Google Chrome', url: 'https://browser-update.org/fa/update-browser.html' },
    FireFox: { title: 'Mozilla FireFox', url: 'https://browser-update.org/fa/update-browser.html' },
    Opera: { title: 'Opera', url: 'https://browser-update.org/fa/update-browser.html' },
    Safari: { title: 'Safari', url: 'https://browser-update.org/fa/update-browser.html' },
    IE: { title: 'IE', url: 'https://browser-update.org/fa/update-browser.html' },
}
export interface IBrowserNotif {
    message: string;
    backgroundColor: string;
    isClosable: boolean;
    isShow: boolean;
}
export interface IDictionaryManager {
    readonly id: number | string;
    title: string;
    isSelected: boolean;
}
export interface ITrueFalse {
    name: string;
    value: string | boolean;
}
export interface ISearchInOrderTo {
    title: string;
    isSelected: boolean;
    key?: string;
}
export interface ITitleValue {
    title: string;
    value: number;
}
export interface ITHV {
    title: string,
    header: string,
    value: number
}
export interface IObjectIteratation {
    field: string;
    header: string;
    isSelected: boolean;
    isSelectedOrigin: boolean;
    ltr?: boolean;
    readonly?: boolean;
    borderize?: boolean;
    icon?: string;
    isBoolean?: boolean;
    isNumber?: boolean;
    isSelectOption?: boolean;
    enableTooltip?: boolean;
    tabIndex?: number;
    type?: string
}
export type BookType = 'xlsx' | 'csv' | 'xls';
export interface INotificationAlertTypes {
    title: string,
    value: number,
    titleUnicode: string
}
export interface ITabWrapperDetectDynamicRoute {
    _title: string,
    _dynamicRoute: string
}
export interface IOffloadModifyType {
    id: number,
    modifyeType: ENOffloadModifyType
}