import { ENOffloadModifyType } from 'interfaces/ioverall-config';

export class OffloadModify {
    static readonly callAnnounce = new OffloadModify(0, ENOffloadModifyType.callAnnounce);
    static readonly wrongReading = new OffloadModify(2, ENOffloadModifyType.wrongReading);

    static readonly blueScreenLight = new OffloadModify(10, ENOffloadModifyType.blueScreenLight, false);
    static readonly intenseLight = new OffloadModify(11, ENOffloadModifyType.intenseLight, false);
    static readonly longDistance = new OffloadModify(12, ENOffloadModifyType.longDistance, false);
    static readonly counterStatesNotMatch = new OffloadModify(13, ENOffloadModifyType.counterStatesNotMatch, false);
    static readonly occasion = new OffloadModify(14, ENOffloadModifyType.occasion, false);
    static readonly inappropriate = new OffloadModify(15, ENOffloadModifyType.inappropriate, false);
    static readonly doorPicture = new OffloadModify(16, ENOffloadModifyType.doorPicture, false);
    static readonly counterHumidity = new OffloadModify(17, ENOffloadModifyType.counterHumidity, false);
    static readonly others = new OffloadModify(18, ENOffloadModifyType.others, false);


    private constructor(
        public readonly id: number,
        public readonly title: ENOffloadModifyType,
        public readonly isSelected?: boolean
    ) { }
}