import { ENRandomNumbers, ENSnackBarColors, ENSnackBarColorsExact, ENSnackBarTimes, ENToastColors } from "./enums.enum";

export interface IAPK {
    versionName: string;
    versionCode: number;
    id?: string;
    file?: File;
    fileRepositoryId: string;
}

export interface IUploadAPK {
    versionName: string;
    versionCode: number;
    description?: string;
    file?: File;
}
export interface IMessage {
    title: string;
    message: string;
    color: ENToastColors;
    seconds: ENSnackBarTimes;
    canSave: boolean;
    text?: ENRandomNumbers;
    exactColor?: ENSnackBarColorsExact;
}
export interface INotifyDirectImage {
    file: string,
    userId: string,
    caption: string,
    calls_ReceiveImageWithCaption?: string
}
export interface IColor {
    text: string,
    value: ENSnackBarColors;
    isClicked: boolean;
    background: ENSnackBarColorsExact;
}
export interface IToastColor {
    text: string,
    value: any;
    isClicked: boolean;
    background: any;
}

export interface ITime {
    value: ENSnackBarTimes;
    title: ENRandomNumbers;
    isClicked: boolean;
}
export interface IChangePassword {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}
export interface IOffloadModifyReq {
    id: string,
    modifyType: number,
    checkedItems: number[],
    counterStateId: number,
    counterNumber: number,
    jalaliDay: string,
    description: string
}
export interface IBatchModifyRes {
    doneCount: number,
    errorCount: number,
    detailsInfo: [
        {
            onOffLoadId: string,
            newOnOffLoadId: string,
            hasError: boolean,
            errorDescription: string
        }
    ],
    isLatestInfo: boolean
}