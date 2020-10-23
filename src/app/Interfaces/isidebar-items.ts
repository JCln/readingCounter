export interface ISidebarItems {
    routerUrl: string;
    name: string;
    isRefreshable: boolean;
    isClosable: boolean;
    sid_isOpenItems?: boolean;   
    subItems?: Array<ISidebarItems>
}
