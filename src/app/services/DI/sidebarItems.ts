import { ISidebarItems } from './../../Interfaces/isidebar-items';

export const sidebarItems: ISidebarItems[] = [
    { routerUrl: '/wr', name: 'مدیریت کاربران', isClosable: false, isRefreshable: false, sid_isOpenItems: false },
    { routerUrl: '/wr/foo', name: 'گزارش گیری', isClosable: true, isRefreshable: true, sid_isOpenItems: false },
    { routerUrl: '/wr/test', name: 'تست', isClosable: true, isRefreshable: true, sid_isOpenItems: false },
    { routerUrl: '/wr/table', name: 'جدول', isClosable: true, isRefreshable: true, sid_isOpenItems: false },
    { routerUrl: '/wr/ms', name: 'مدیریت سرور', isClosable: true, isRefreshable: true, sid_isOpenItems: false },
    { routerUrl: '/wr/profile', name: 'پروفایل', isClosable: true, isRefreshable: true, sid_isOpenItems: false },
    { routerUrl: '/wr/apk', name: 'apk', isClosable: true, isRefreshable: true, sid_isOpenItems: false }
]