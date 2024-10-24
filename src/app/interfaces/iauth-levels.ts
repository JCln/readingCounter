export interface IAuthLevels {
    id: number;
    title: string;
    logicalorder: number;
    inSidebar: boolean;
}
export interface IAuthLevel2 {
    id: number;
    authLevel1Id: number;
    dynamicId: any;
    title: string;
    cssClass: string;
    inSidebar: boolean;
    logicalorder: number;
}

export interface IAuthLevel3 {
    id: number;
    authLevel2Id: number;
    dynamicId: any,
    title: string;
    cssClass: string;
    route: string;
    logicalorder: number;
    inSidebar: boolean;
    isClosable: boolean;
    isRefreshable: boolean;
}
export interface IAuthLevel4 {
    id: number;
    authLevel3Id: number;
    dynamicId: any;
    title: string;
    value: string;
    cssClass: string;
    logicalorder: number;
    isSidebar: boolean
}





