import { IPrivacy } from './../../Interfaces/iprivacy';

export const privacies: IPrivacy =
{
    id: 1,
    title: 'همه ی موارد',
    isChecked: false,
    task: [
        {
            id: 1,
            title: 'با حروف کوچک انگلیسی باشد',
            isChecked: false
        },
        {
            id: 1,
            title: 'با حروف بزرگ انگلیسی باشد',
            isChecked: false
        },
        {
            id: 1,
            title: 'غیر عددی و الفبایی انگلیسی باشد',
            isChecked: false
        },
        {
            id: 1,
            title: 'عددی باشد',
            isChecked: false
        }
    ]
}