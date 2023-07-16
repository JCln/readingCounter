export interface ICredentials {
    username: string,
    password: string,
    appVersion: string,
    dntCaptchaText: string,
    dntCaptchaToken: string,
    dntCaptchaInputText: string,
    clientDateTime: string,
}
export enum ENAuthTokenType {
    access_token = 'access_token',
    refresh_token = 'refresh_token'
}
export interface IAuthTokenType {
    access_token: string;
    refresh_token: string;
}
export interface IAuthUser {
    userId: string;
    userName: string;
    displayName: string;
    roles: string[] | null;
}
