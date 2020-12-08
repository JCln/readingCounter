export const addUserManager: any = {
    provinceItems: [
        {
            title: '',
            logicalOrder: 0,
            regionItems: [
                {
                    title: '',
                    logicalOrder: 0,
                    zoneItems: [
                        {
                            title: '',
                            logicalOrder: 0,
                            id: 0,
                            isMetro: false,
                            isSelected: false
                        }
                    ]
                }
            ]
        }
    ],
    appItems: [
        {
            title: 'مدیریت سامانه',
            cssClass: '',
            logicalOrder: 0,
            moduleItems: [
                {
                    title: 'دسترسی های عمومی',
                    cssClass: '',
                    logicalOrder: 1,
                    controllerItems: [
                        {
                            title: 'پنل کاربری',
                            cssClass: '',
                            logicalOrder: 2,
                            actionItems: [
                                {
                                    title: 'مشاهده نوار کنار',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "UserManager.GetUserSidebar",
                                    isSelected: false
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'درخت دسترسی',
                    cssClass: '',
                    logicalOrder: 1,
                    controllerItems: [
                        {
                            title: 'App ها',
                            cssClass: '',
                            logicalOrder: 2,
                            actionItems: [
                                {
                                    title: 'مشاهده نوار کنار',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "AuthLevel1Manager.GetAll",
                                    isSelected: false
                                },
                                {
                                    title: 'مشاهده دیکشنری',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "AuthLevel1Manager.GetDictionary",
                                    isSelected: false
                                },
                                {
                                    title: 'ویرایش',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "AuthLevel1Manager.Edit",
                                    isSelected: false
                                },
                                {
                                    title: 'افزودن',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "AuthLevel1Manager.Add",
                                    isSelected: false
                                },
                                {
                                    title: 'حذف',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "AuthLevel1Manager.Remove",
                                    isSelected: false
                                }
                            ]
                        },
                        {
                            title: 'ماژول ها',
                            cssClass: '',
                            logicalOrder: 2,
                            actionItems: [
                                {
                                    title: 'مشاهده همه',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "AuthLevel2Manager.GetAll",
                                    isSelected: false
                                },
                                {
                                    title: 'مشاهده دیکشنری',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "AuthLevel2Manager.GetDictionary",
                                    isSelected: false
                                },
                                {
                                    title: 'ویرایش',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "AuthLevel2Manager.Edit",
                                    isSelected: false
                                },
                                {
                                    title: 'افزودن',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "AuthLevel2Manager.Add",
                                    isSelected: false
                                },
                                {
                                    title: 'حذف',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "AuthLevel2Manager.Remove",
                                    isSelected: false
                                }
                            ]
                        },
                        {
                            title: 'کنترلر ها',
                            cssClass: '',
                            logicalOrder: 2,
                            actionItems: [
                                {
                                    title: 'مشاهده همه',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "AuthLevel3Manager.GetAll",
                                    isSelected: false
                                },
                                {
                                    title: 'مشاهده دیکشنری',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "AuthLevel3Manager.GetDictionary",
                                    isSelected: false
                                },
                                {
                                    title: 'ویرایش',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "AuthLevel3Manager.Edit",
                                    isSelected: false
                                },
                                {
                                    title: 'افزودن',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "AuthLevel3Manager.Add",
                                    isSelected: false
                                },
                                {
                                    title: 'حذف',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "AuthLevel3Manager.Remove",
                                    isSelected: false
                                }
                            ]
                        },
                        {
                            title: 'اکشن ها',
                            cssClass: '',
                            logicalOrder: 2,
                            actionItems: [
                                {
                                    title: 'مشاهده همه',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "AuthLevel4Manager.GetAll",
                                    isSelected: false
                                },
                                {
                                    title: 'مشاهده دیکشنری',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "AuthLevel4Manager.GetDictionary",
                                    isSelected: false
                                },
                                {
                                    title: 'ویرایش',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "AuthLevel4Manager.Edit",
                                    isSelected: false
                                },
                                {
                                    title: 'افزودن',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "AuthLevel4Manager.Add",
                                    isSelected: false
                                },
                                {
                                    title: 'حذف',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "AuthLevel4Manager.Remove",
                                    isSelected: false
                                }
                            ]
                        },
                    ]
                },
                {
                    title: 'مدیریت کاربران',
                    cssClass: '',
                    logicalOrder: 1,
                    controllerItems: [
                        {
                            title: 'مشاهده همه',
                            cssClass: '',
                            logicalOrder: 2,
                            actionItems: [
                                {
                                    title: 'مشاهده همه',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "UserManager.GetUsers",
                                    isSelected: false
                                },
                                {
                                    title: 'مشاهده فرم ویرایش کاربر',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "UserManager.GetUserEditDto",
                                    isSelected: false
                                },
                                {
                                    title: 'ویرایش کابر',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "UserManager.EditUser",
                                    isSelected: false
                                },
                            ]
                        },
                        {
                            title: 'افزودن کاربر',
                            cssClass: '',
                            logicalOrder: 2,
                            actionItems: [
                                {
                                    title: 'مشاهده فرم افزودن کاربر',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "UserManager.GetUserCreationDto",
                                    isSelected: false
                                },
                                {
                                    title: 'افزودن کاربر',
                                    cssClass: '',
                                    logicalOrder: 3,
                                    value: "UserManager.AddUser",
                                    isSelected: false
                                },
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    roleItems: [
        {
            id: 0,
            title: '',
            isSelected: false
        }
    ],
    userInfo: {
        id: '',
        userCode: 0,
        username: '',
        firstName: '',
        sureName: '',
        email: '',
        mobile: '',
        displayName: '',
        isActive: false,
        deviceId: ''
    }
}