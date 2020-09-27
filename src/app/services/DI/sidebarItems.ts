import { ISidebarItems } from './../../Interfaces/isidebar-items';

export const sidebarItems: ISidebarItems[] = [
    { routerUrl: '/fr', name: 'مدیریت کاربران', isClosable: false, isRefreshable: false, sid_isOpenItems: false },
    { routerUrl: '/fr/foo', name: 'گزارش گیری', isClosable: true, isRefreshable: true, sid_isOpenItems: false },
    { routerUrl: '/fr/test', name: 'تست', isClosable: true, isRefreshable: true, sid_isOpenItems: false },
    { routerUrl: '/fr/table', name: 'جدول', isClosable: true, isRefreshable: true, sid_isOpenItems: false }
]