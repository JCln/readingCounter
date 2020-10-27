export interface IAuthLevels {
    id: number;
    title: string;
    logicalorder: number;
    inSidebar: boolean;
}
export interface IAuthLevel2 {
    id: number;
    authlevel1Id: number;
    title: string;
    logicalorder: number;
    inSidebar: boolean;
}

export interface IAuthLevel3 {
    id: number;
    authlevel2Id: number;
    title: string;
    route: string;
    logicalorder: number;
    inSidebar: boolean;
    isClosable: boolean;
    isRefreshable: boolean;
    logicalOrder: number;
}

export interface IAuthLevel4 {
    id: number;
    authlevel3Id: number;
    title: string;
    value: string;
    cssClass: string;
    logicalorder: number;
}





