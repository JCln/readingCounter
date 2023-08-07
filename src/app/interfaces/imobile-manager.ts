export interface IFeedbackType {
    id: number,
    title: string,
    isComplaint: boolean,
    isActive: boolean,
    isNew?: boolean
}
export interface IFeedbackList {
    id: string,
    insertDayJalali: string,
    insertTime: string,
    inComplaint: boolean,
    feedbackTypeTitle: string,
    mobile: string,
    description: string,
    solution: string,
    mediaCount: number
}
export interface IFeedbackListReq {
    fromDate: '',
    toDate: '',
}