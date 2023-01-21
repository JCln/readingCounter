export interface IUserManager {
    id: string;
    userCode: number;
    username: string;
    mobile: string;
    lockTimeSpan: string;
    displayName: string;
    isActive: boolean;
    isLocked: boolean;
    defaultZoneTitle: string;
    deviceId: string;
}
export interface IUserLogginInfo {
    GUid: string,
    userCode: number,
    userName: string,
    displayName: string,
}
export interface IUserEditManager {
    provinceItems: [
        {
            title: string,
            logicalOrder: number,
            regionItems: [
                {
                    title: string,
                    logicalOrder: number,
                    zoneItems: [
                        {
                            title: string,
                            logicalOrder: number,
                            id: number,
                            isMetro: boolean,
                            isSelected: boolean
                        }
                    ]
                }
            ]
        }
    ],
    appItems: [
        {
            title: string,
            cssClass: string,
            logicalOrder: number,
            moduleItems: [
                {
                    title: string,
                    cssClass: string,
                    logicalOrder: number,
                    controllerItems: [
                        {
                            title: string,
                            cssClass: string,
                            logicalOrder: number,
                            actionItems: [
                                {
                                    title: string,
                                    cssClass: string,
                                    logicalOrder: number,
                                    value: string,
                                    isSelected: boolean
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    roleItems: [
        {
            id: number,
            title: string,
            isSelected: boolean
        }
    ],
    userInfo: {
        id: string;
        userCode: number,
        username: string,
        firstName: string,
        sureName: string,
        email: string,
        mobile: string,
        displayName: string,
        displayMobile: boolean;
        isActive: boolean,
        deviceId: string
    }
}
export interface IRoleManager {
    id?: number;
    title: string;
    isActive: boolean
    needDeviceIdLogin: boolean;
    titleUnicode: string;
    isNew?: boolean
}
export interface IAUserEditSave {
    selectedRoles: number[],
    selectedZones: number[],
    selectedActions: string[],
    id: string,
    firstName: string,
    sureName: string,
    email: string,
    mobile: string,
    displayMobile: boolean,
    displayName: string,
    deviceId: string,
    isActive: boolean
}
export interface IUserInfo {
    userCode?: number,
    username?: string,
    isActive?: boolean,
    displayMobile?: boolean,
    id: string,
    firstName: string,
    sureName: string,
    email: string,
    mobile: string,
    displayName: string,
    deviceId: string
}
export interface IRoleItems {
    id: number;
    title: string;
    isSelected: boolean;
}
export interface appItems {
    title: string,
    cssClass: string,
    logicalOrder: number,
    moduleItems: [
        {
            title: string,
            cssClass: string,
            logicalOrder: number,
            controllerItems: [
                {
                    title: string,
                    cssClass: string,
                    logicalOrder: number,
                    actionItems: [
                        {
                            title: string,
                            cssClass: string,
                            logicalOrder: number,
                            value: string,
                            isSelected: boolean
                        }
                    ]
                }
            ]
        }
    ]
}
export interface IUserEditOnRole {
    roleId: number,
    selectedActions: string[]
}
// add user 
export interface IAddUserManager {
    provinceItems: [
        {
            title: string,
            logicalOrder: number,
            regionItems: [
                {
                    title: string,
                    logicalOrder: number,
                    zoneItems: [
                        {
                            title: string,
                            logicalOrder: number,
                            id: number,
                            isMetro: boolean,
                            isSelected: boolean
                        }
                    ],
                    isSelected: boolean
                }
            ],
            isSelected: boolean
        }
    ],
    appItems: [
        {
            title: string,
            cssClass: string,
            logicalOrder: number,
            moduleItems: [
                {
                    title: string,
                    cssClass: string,
                    logicalOrder: number,
                    controllerItems: [
                        {
                            title: string,
                            cssClass: string,
                            logicalOrder: number,
                            actionItems: [
                                {
                                    title: string,
                                    cssClass: string,
                                    logicalOrder: number,
                                    value: string,
                                    isSelected: boolean
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    roleItems: [
        {
            id: number,
            title: string,
            isSelected: boolean
        }
    ]
}
export interface IAddProvinceItems {
    provinceItems: [
        {
            title: string,
            logicalOrder: number,
            regionItems: [
                {
                    title: string,
                    logicalOrder: number,
                    zoneItems: [
                        {
                            title: string,
                            logicalOrder: number,
                            id: number,
                            isMetro: boolean,
                            isSelected: boolean
                        }
                    ],
                    isSelected: boolean
                }
            ],
            isSelected: boolean
        }
    ],
}
export interface IAddAUserManager {
    selectedRoles: number[],
    selectedZones: number[],
    selectedActions: string[],
    userCode: number,
    username: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    sureName: string,
    email: string,
    mobile: string,
    displayMobile: boolean,
    displayName: string,
    isActive: boolean,
    deviceId: string
}
export interface IAddUserInfos {
    userCode: number,
    username: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    sureName: string,
    email: string,
    mobile: string,
    displayMobile: boolean,
    displayName: string,
    isActive: boolean,
    deviceId: string
}
export interface ISearchUsersManager {
    selectedRoles: any[],
    selectedZones: number[],
    selectedActions: string[]
}
//

export interface IUserLoggins {
    id: string,
    userId: string,
    loginDateTime: string,
    loginIp: string,
    wasSuccessful: boolean,
    browserVersion: string,
    browserTitle: string,
    browserShortTitle: string,
    browserEngine: string,
    browserType: string,
    osVersion: string,
    osTitle: string,
    osPlatform: string,
    osShortTitle: string,
    userAgent: string,
    wrongPassword: string,
    appVersion: string,
}
export interface IUserKarkardSummary {
    zoneTitle: string,
    userDisplayName: string,
    overalCount: number,
    trackingStages: [
        {
            id: number,
            title: string,
            count: number
        }
    ]
}