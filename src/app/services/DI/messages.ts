import { EN_messages } from 'interfaces/enums.enum';
import { IColor, IMessage, ITime } from 'interfaces/inon-manage';
import { ENRandomNumbers, ENSnackBarColors, ENSnackBarColorsExact, ENSnackBarTimes } from 'interfaces/ioverall-config';

export enum ENColorText {
    blue = 'آبی',
    green = 'سبز',
    orange = 'نارنجی',
    red = 'قرمز',
}

export const broadcastMessages: IMessage[] = [
    { title: EN_messages.broadTitle1, text: ENRandomNumbers.twenty, message: EN_messages.broadMessage1, exactColor: ENSnackBarColorsExact.info, color: ENSnackBarColors.info, time: ENSnackBarTimes.twentyMili, canSave: true },
    { title: EN_messages.broadTitle2, text: ENRandomNumbers.twenty, message: EN_messages.broadMessage2, exactColor: ENSnackBarColorsExact.warn, color: ENSnackBarColors.warn, time: ENSnackBarTimes.twentyMili, canSave: true },
    { title: EN_messages.broadTitle3, text: ENRandomNumbers.twenty, message: EN_messages.broadMessage3, exactColor: ENSnackBarColorsExact.success, color: ENSnackBarColors.success, time: ENSnackBarTimes.twentyMili, canSave: true }
]

export const times: ITime[] = [
    { title: ENRandomNumbers.five, value: ENSnackBarTimes.fiveMili, isClicked: false },
    { title: ENRandomNumbers.ten, value: ENSnackBarTimes.tenMili, isClicked: false },
    { title: ENRandomNumbers.fifteen, value: ENSnackBarTimes.fifteenMili, isClicked: false },
    { title: ENRandomNumbers.twenty, value: ENSnackBarTimes.twentyMili, isClicked: false },
    { title: ENRandomNumbers.thirdy, value: ENSnackBarTimes.thirdyMili, isClicked: false },
    { title: ENRandomNumbers.fifty, value: ENSnackBarTimes.fiftyMili, isClicked: false },
]

export const colors: IColor[] = [
    { text: ENColorText.blue, value: ENSnackBarColors.info, isClicked: false, background: ENSnackBarColorsExact.info },
    { text: ENColorText.green, value: ENSnackBarColors.success, isClicked: false, background: ENSnackBarColorsExact.success },
    { text: ENColorText.orange, value: ENSnackBarColors.warn, isClicked: false, background: ENSnackBarColorsExact.warn },
    { text: ENColorText.red, value: ENSnackBarColors.danger, isClicked: false, background: ENSnackBarColorsExact.danger }
]