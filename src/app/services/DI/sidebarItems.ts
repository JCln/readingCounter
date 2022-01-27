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
            ]
        }
        // ,{
        //     route: '', title: ' مدیریت قرائت', logicalOrder: 1, cssClass: 'fab fa-deviantart', isOpen: false, subItems: [
        //         { route: '/wr/m/kar', title: 'karbari', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 1 },
        //         { route: '/wr/m/cs', title: 'counterState', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 },
        //         { route: '/wr/m/ms', title: 'مدیریت سرور', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 },
        //         { route: '/wr/m/qr', title: 'قطر', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 },
        //         { route: '/wr/m/cr', title: 'گزارش قرائت', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 },
        //         { route: '/wr/m/rp', title: 'مدیریت دوره قرائت', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 },
        //         { route: '/wr/m/rpk', title: 'مدیریت نوع دوره', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 },
        //         { route: '/wr/m/mrm', title: 'مدیریت نقش ها', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 },
        //     ]
        // },
        // {
        //     route: '', title: 'درخت دسترسی', logicalOrder: 1, cssClass: 'fas fa-users-cog ', isOpen: false, subItems: [
        //         { route: '/wr/m/al/ap', title: 'apps', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 3 },
        //         { route: '/wr/m/al/me', title: 'modules', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 3 },
        //         { route: '/wr/m/al/cr', title: 'controllers', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 3 },
        //         { route: '/wr/m/al/ac', title: 'actions', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 3 },
        //     ]
        // },
        // {
        //     route: '', title: 'مدیریت نواحی', logicalOrder: 1, cssClass: 'fas fa-bezier-curve', isOpen: false, subItems: [
        //         { route: '/wr/m/mc', title: 'مدیریت کشور', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 3 },
        //         { route: '/wr/m/mp', title: 'مدیریت استان', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 3 },
        //         { route: '/wr/m/mr', title: 'مدیریت منطقه', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 3 },
        //         { route: '/wr/m/mz', title: 'مدیریت ناحیه', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 3 },
        //         { route: '/wr/m/mzd', title: 'مدیریت محدوده', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 3 },
        //     ]
        // },
        // {
        //     route: '', title: 'مدیریت کاربران', logicalOrder: 1, cssClass: 'fab fa-deviantart', isOpen: false, subItems: [
        //         { route: '/wr/mu/all', title: 'agGrid', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 },
        //         { route: '/wr/mu/add', title: 'add Contact mg', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 1 }
        //     ]
        // },
        // {
        //     route: '', title: 'گزارشات', logicalOrder: 1, cssClass: 'fas fa-chalkboard-teacher', isOpen: false, subItems: [
        //         { route: '/wr/rpts/exm/master', title: 'بازرسی', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 },
        //         { route: '/wr/rpts/exm/details', title: 'جزئیات ', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 }
        //     ]
        // },
        // {
        //     route: '', title: 'tracking', logicalOrder: 1, cssClass: 'fas fa-chalkboard-teacher', isOpen: false, subItems: [
        //         { route: '/wr/imd', title: 'import dynamic', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 },
        //         { route: '/wr/m/s/fwu', title: 'پیگیری درخواست', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 },
        //         { route: '/wr/m/track/imported', title: 'imported', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 },
        //         { route: '/wr/m/track/loaded', title: 'loaded', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 },
        //         { route: '/wr/m/track/reading', title: 'reading', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 },
        //         { route: '/wr/m/track/offloaded', title: 'offloaded', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 },
        //         { route: '/wr/m/track/finished', title: 'finished', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 },
        //         { route: '/wr/m/track/woui', title: 'WOUI', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 2 }
        //     ]
        // },
        // {
        //     route: '', title: 'DBF', logicalOrder: 1, cssClass: 'fas fa-chalkboard-teacher', isOpen: false, subItems: [
        //         { route: '/wr/m/dbf', title: 'خروجی dbf', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 1 }
        //     ]
        // },
        // {
        //     route: '', title: 'Forbidden', logicalOrder: 1, cssClass: 'fas fa-chalkboard-teacher', isOpen: false, subItems: [
        //         { route: '/wr/m/fbn', title: 'غیر مجاز', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 1 }
        //     ]
        // },
        // {
        //     route: '', title: 'سایر', logicalOrder: 1, cssClass: 'fas fa-chalkboard-teacher', isOpen: false, subItems: [
        //         { route: '/wr/profile', title: 'پروفایل', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 3 },
        //         { route: '/wr/apk', title: 'apk', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 3 },
        //         { route: '/wr/bi', title: 'اطلاعات پایه', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 3 },
        //         { route: '/wr/msge', title: 'پیام زمان‌دار', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 3 },
        //         { route: '/wr/policies', title: 'تنظیمات کلمه عبور', isClosable: true, isRefreshable: true, cssClass: '', logicalOrder: 3 }
        //     ]
        // },
    ]
}