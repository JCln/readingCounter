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
