export interface IMessage {
    title: string;
    text: string;
    color: string;
    showTime: number;
    canSave: boolean;
}

export interface IColor {
    value: string;
    isClicked: boolean;
    background: string;
}

export interface ITime {
    value: number;
    isClicked: boolean;
}
