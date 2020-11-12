export interface IUserManager {
    id: string;
    userCode: number;
    username: string;
    mobile: string;
    displayName: string;
    isActive: boolean;
    isLocked: boolean;
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
        isActive: boolean,
        deviceId: string
    }
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
    deviceId: string
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
//