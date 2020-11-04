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
export interface IUserEditappItemsManager {
    title: string,
    cssClass: string,
    logicalOrder: number,
    moduleItems: []
}