import { EN_messages } from 'interfaces/enums.enum';
import { IMessage, ITime, IToastColor } from 'interfaces/inon-manage';
import {
    ENRandomNumbers,
    ENSnackBarColorsExact,
    ENSnackBarTimes,
    ENToastColors,
} from 'interfaces/ioverall-config';

export enum ENColorText {
    blue = 'آبی',
    green = 'سبز',
    orange = 'نارنجی',
    red = 'قرمز',
}

export const broadcastMessages: IMessage[] = [
    { title: EN_messages.broadTitle1, text: ENRandomNumbers.twenty, message: EN_messages.broadMessage1, exactColor: ENSnackBarColorsExact.info, color: ENToastColors.info, seconds: ENSnackBarTimes.twentyMili, canSave: true },
    { title: EN_messages.broadTitle2, text: ENRandomNumbers.twenty, message: EN_messages.broadMessage2, exactColor: ENSnackBarColorsExact.warn, color: ENToastColors.warn, seconds: ENSnackBarTimes.twentyMili, canSave: true },
    { title: EN_messages.broadTitle3, text: ENRandomNumbers.twenty, message: EN_messages.broadMessage3, exactColor: ENSnackBarColorsExact.success, color: ENToastColors.success, seconds: ENSnackBarTimes.twentyMili, canSave: true }
]

export const times: ITime[] = [
    { title: ENRandomNumbers.five, value: ENSnackBarTimes.fiveMili, isClicked: false },
    { title: ENRandomNumbers.ten, value: ENSnackBarTimes.tenMili, isClicked: false },
    { title: ENRandomNumbers.fifteen, value: ENSnackBarTimes.fifteenMili, isClicked: false },
    { title: ENRandomNumbers.twenty, value: ENSnackBarTimes.twentyMili, isClicked: false },
    { title: ENRandomNumbers.thirdy, value: ENSnackBarTimes.thirdyMili, isClicked: false },
    { title: ENRandomNumbers.fifty, value: ENSnackBarTimes.fiftyMili, isClicked: false },
]

export const toastColors: IToastColor[] = [
    { text: ENColorText.blue, value: ENToastColors.info, isClicked: false, background: ENSnackBarColorsExact.info },
    { text: ENColorText.green, value: ENToastColors.success, isClicked: false, background: ENSnackBarColorsExact.success },
    { text: ENColorText.orange, value: ENToastColors.warn, isClicked: false, background: ENSnackBarColorsExact.warn },
    { text: ENColorText.red, value: ENToastColors.error, isClicked: false, background: ENSnackBarColorsExact.danger }
]