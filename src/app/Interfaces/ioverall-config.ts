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
export interface ISnackBar {
    message: string;
    duration: number;
    backColor?: string;
}
export enum ENSnackBarColors {
    warn = 'snack_warn',
    danger = 'snack_danger',
    success = 'snack_success',
}
export enum ENSnackBarTimes {
    threeMili = 3000,
    fourMili = 4000,
    fiveMili = 5000,
    sevenMili = 7000,
    tenMili = 10000
}
export enum ENStorageColumnKey {
    all_users_session = 'all_users_session'
}
export interface IResponses {
    isValid: boolean
    message: string;
    status: number
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
}
export interface ITitleValue {
    title: string;
    value: number;
}
export interface IObjectIteratation {
    field: string;
    header: string;
    isSelected: boolean;
    ltr?: boolean;
    readonly?: boolean;
}
export interface ITabWrapperDetectDynamicRoute {
    _title: string,
    _dynamicRoute: string
}