export enum ENAcceptVerb {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
}
export enum ENParamSendType {
    fromBody = 'fromBody',
    fromForm = 'fromForm',
    fromQuery = 'fromQuery',
    fromURI = 'fromURI',
}
export enum ENJsonInfo {
    fromDate = 'fromDate',
    toDate = 'toDate',
    zoneId = 'zoneId',
    karbari = 'karbari',
    masraf = 'masraf',
}
export interface IJsonInfo {
    id: number,
    name: string,
    value: ENJsonInfo
}
export interface IAcceptVerb {
    id: number,
    name: string,
    method: ENAcceptVerb
}
export interface IParamSendType {
    id: number,
    name: string,
    type: ENParamSendType
}
export interface IDynamicExcelReq {
    id: number,
    title: string,
    description: string,
    url: string,
    acceptVerb: string,
    jsonInfo: string,
    paramSendType: string,
    // createDateTime: string,
    // isActive: boolean
}