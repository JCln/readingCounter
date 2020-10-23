import { ISidebarItems } from './../../Interfaces/isidebar-items';

export const sidebarItems: ISidebarItems[] = [
    {
        routerUrl: '/wr', name: 'مدیریت', isClosable: false, isRefreshable: false, sid_isOpenItems: false, subItems: [
            { routerUrl: '/wr/rm', name: 'مدیریت نقش ها', isClosable: true, isRefreshable: true, sid_isOpenItems: false }
        ]
    },
    { routerUrl: '/wr/foo', name: 'گزارش گیری', isClosable: true, isRefreshable: true, sid_isOpenItems: false },
    { routerUrl: '/wr/test', name: 'تست', isClosable: true, isRefreshable: true, sid_isOpenItems: false },
    { routerUrl: '/wr/table', name: 'جدول', isClosable: true, isRefreshable: true, sid_isOpenItems: false },
    { routerUrl: '/wr/ms', name: 'مدیریت سرور', isClosable: true, isRefreshable: true, sid_isOpenItems: false },
    { routerUrl: '/wr/profile', name: 'پروفایل', isClosable: true, isRefreshable: true, sid_isOpenItems: false },
    { routerUrl: '/wr/apk', name: 'apk', isClosable: true, isRefreshable: true, sid_isOpenItems: false },
    { routerUrl: '/wr/bi', name: 'اطلاعات پایه', isClosable: true, isRefreshable: true, sid_isOpenItems: false },
    { routerUrl: '/wr/privacy', name: 'تنظیمات کلمه عبور', isClosable: true, isRefreshable: true, sid_isOpenItems: false },
    { routerUrl: '/wr/msge', name: 'پیام سیستمی', isClosable: true, isRefreshable: true, sid_isOpenItems: false }
]