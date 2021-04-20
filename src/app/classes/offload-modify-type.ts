import { ENOffloadModifyType } from './../Interfaces/inon-manage';

export class OffloadModify {
    static readonly callAnnounce = new OffloadModify(0, ENOffloadModifyType.callAnnounce);
    static readonly wrongReading = new OffloadModify(2, ENOffloadModifyType.wrongReading);

    static readonly blueScreenLight = new OffloadModify(3, ENOffloadModifyType.blueScreenLight, false);
    static readonly intenseLight = new OffloadModify(4, ENOffloadModifyType.intenseLight, false);
    static readonly longDistance = new OffloadModify(5, ENOffloadModifyType.longDistance, false);
    static readonly counterStatesNotMatch = new OffloadModify(6, ENOffloadModifyType.counterStatesNotMatch, false);


    private constructor(
        public readonly id: number,
        public readonly title: ENOffloadModifyType,
        public readonly isSelected?: boolean
    ) { }
}