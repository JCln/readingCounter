export interface IPolicies {
    id: number,
    enableValidIpCaptcha: boolean,
    requireCaptchaInvalidAttempts: number,
    enableValidIpRecaptcha: boolean,
    requireRecaptchaInvalidAttempts: number,
    lockInvalidAttempts: number,
    lockMin: number,
    minPasswordLength: number,
    passwordContainsNumber: boolean,
    passwordContainsLowercase: boolean,
    passwordContainsUppercase: boolean,
    passwordContainsNonAlphaNumeric: boolean,
    canUpdateDeviceId: boolean,
    enableXSSProtection?: boolean,
    enableObscureHeaderInfo?: boolean,
    secureCookies?: boolean,
    DOSProtection?: boolean,
    STEALTH?: boolean,//useSingleActiveUser true
    useJWTDecoder?: boolean,
    CSRFProtection?: boolean,
    DDOSProtection?: boolean,
    CSPProtection?: boolean,
    HSTSProtection?: boolean,// false
    SanitizeUserInputs?: boolean,//true
    AES512Protection?: boolean,
    autoClearData?: boolean,

}
export interface IPrivacy {
    minLength: number;
    maxLength: number;
    minPasswordLength: number;
    min_LockInvalidAttemps: number;
    max_LockInvalidAttemps: number;
    min_LockMin: number,
    max_LockMin: number,
    min_captcha: number,
    max_captcha: number,
    min_ReCaptcha: number,
    max_ReCaptcha: number,
}
export const privacies: IPrivacy = {
    minLength: 4,
    maxLength: 16,
    minPasswordLength: 6,
    min_LockInvalidAttemps: 1,
    max_LockInvalidAttemps: 10,
    min_LockMin: 10,//minutes
    max_LockMin: 120,//minutes
    min_captcha: 2,
    max_captcha: 10,
    min_ReCaptcha: 2,
    max_ReCaptcha: 10,
}
