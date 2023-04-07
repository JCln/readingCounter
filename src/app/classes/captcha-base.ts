export abstract class DNTCaptchaBase {
    DNTCaptchaText = '';
    DNTCaptchaToken = '';
    DNTCaptchaInputText = '';
}

export class DNTCaptchaApiResponse {
    constructor(
        public dntCaptchaImgUrl: string = '',
        public dntCaptchaId: string = '',
        public dntCaptchaTextValue: string = '',
        public dntCaptchaTokenValue: string = ''
    ) { }
}