export interface IMessage {
    text: string;
    color: string;
    showTime: number;
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
