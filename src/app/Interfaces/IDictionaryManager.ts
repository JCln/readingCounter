
export interface IDictionaryManager {
    readonly id: number | string;
    title: string;
    isSelected: boolean;
}
export interface ITrueFalse {
    name: string;
    value: string | boolean;
}
export interface ISearchInOrderTo {
    title: string;
    isSelected: boolean;
}
export interface IObjectIteratation {
    field: string;
    header: string;
    isSelected: boolean;
}
