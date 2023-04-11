export abstract class DNTCaptchaBase {
    dntCaptchaText = '';
    dntCaptchaToken = '';
    dntCaptchaInputText = '';
}

export class DNTCaptchaApiResponse {
    constructor(
        public dntCaptchaImgUrl: string = '',
        public dntCaptchaId: string = '',
        public dntCaptchaTextValue: string = '',
        public dntCaptchaTokenValue: string = ''
    ) { }
}