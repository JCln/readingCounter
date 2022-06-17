import { EN_Routes } from 'interfaces/routes.enum';

export const sidebarItemsTest = {
    addStaticSubRoutes: [
        {
            route: '', title: '', logicalOrder: 1, cssClass: '', isOpen: false, subItems: [
                { route: EN_Routes.wrmfbnres, title: '-غیرمجاز', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 },
                { route: EN_Routes.wrrptsmamkarkardchart, title: 'چ_کارکرد', isClosable: true, isRefreshable: false, cssClass: '', logicalOrder: 2 },
                { route: EN_Routes.wrrptsmamdhchart, title: 'چ_پراکندگی ساعت', isClosable: true, isRefreshable: false, cssClass: '', logicalOrder: 2 },
                { route: EN_Routes.wrrptsmamtrvchchart, title: 'چ_پیمایش تغییرات', isClosable: true, isRefreshable: false, cssClass: '', logicalOrder: 2 },
                { route: EN_Routes.wrmms, title: 'مدیریت سرور', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 },
                { route: EN_Routes.wrmlallfalse, title: 'لیست', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 },
                { route: EN_Routes.wrmlalltrue, title: 'اصلاح', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 },
                { route: EN_Routes.wrmlGeneralModify, title: 'اصلاح کلی', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 },
                { route: EN_Routes.wrmlGeneralGModify, title: 'اصلاح کلی(دسته‌ای)', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 },
                { route: EN_Routes.wrimpsimafardpgbatch, title: 'صدور دسته‌ای', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 },
            ]
        }
    ]
}