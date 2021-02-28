export interface IAuthGuardPermission {
    permittedRoles?: string[];
    deniedRoles?: string[];
}
export interface ICredentials {
    username: string;
    password: string;
}
export enum AuthTokenType {
    access_token,
    refresh_token
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
