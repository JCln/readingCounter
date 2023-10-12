export interface ICredentials {
    username: string,
    password: string,
    appVersion: string,
    dntCaptchaText: string,
    dntCaptchaToken: string,
    dntCaptchaInputText: string,
    clientDateTime: string,
}
export interface ILogin2 {
    deviceSerial: string,
    appVersion: string,
    clientDateTime: string,
    loginId: string,
    code: number
}
export interface ICredentialsResponse {
    access_token: string,
    refresh_token: string,
    login_id: string,
    two_steps: boolean,
    expire_seconds: number,
}
export enum ENAuthTokenType {
    access_token = 'access_token',
    refresh_token = 'refresh_token',
    login_id = 'login_id'
}
export interface IAuthTokenType {
    access_token: string;
    refresh_token: string;
    login_id: string;
}
export interface IAuthTokenLogoutType {
    accessToken: string;
    refreshToken: string;
    loginId: string;
}
export interface IAuthUser {
    userId: string;
    userName: string;
    displayName: string;
    roles: string[] | null;
}
