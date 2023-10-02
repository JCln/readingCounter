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
