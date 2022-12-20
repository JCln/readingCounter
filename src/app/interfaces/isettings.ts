
export interface IProfile {
    firstName: string,
    sureName: string,
    username: string,
    email: string,
    displayName: string,
    userCode: number
}
export interface ILicenseInfo {
    license: string,
    expirationDay: string
}
export interface IWaterMarkConfig {
    id: string,
    r: number,
    g: number,
    b: number,
    a: number,
    fontSize: number,
    x: number,
    y: number,
    userDisplayName: string,
    insertDateTime: string,
    shouldActiveDisplayName: boolean
}