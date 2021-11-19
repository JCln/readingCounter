import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FollowUpService {
  private trackNumber: number = null;

  setTrackNumber = (track: number) => this.trackNumber = track;
  getTrackNumber = (): number => { return this.trackNumber; }
  hasTrackNumber = (): boolean => {
    return !(typeof this.trackNumber === 'undefined' || !this.trackNumber || this.trackNumber === null);
  }
}
