export interface IRandomImages {
    zoneId?: number,
    userId: string,
    quantity: number,
    day: string
}
export interface ImageAttributionFile {
    imageAttributionIds: number[],
    fileRepositoryId: string,
    onOffLoadId: string
}

export interface IDownloadFileAllImages {
    zoneId: number,
    day: string
}
export interface IDownloadFileAllImagesTwo {
    zoneId: number,
    fromDay: string,
    toDay: string,
}
export interface IImageResultDetails {
    zoneId: number,
    fromDate: string,
    toDate: string,
    imageAttributionIds: number[]
}