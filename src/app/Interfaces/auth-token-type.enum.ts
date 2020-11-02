export enum AuthTokenType {
    access_token = '',
    refresh_token = ''
}
export interface IAuthTokenType {
    access_token: string;
    refresh_token: string;
}