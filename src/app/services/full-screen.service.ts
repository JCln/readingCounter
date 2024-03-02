import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FullScreenService {
  onFullScreenListener: any;
  _isFullScreen: boolean = false;

  constructor() {
    this.bindDocumentListeners();
  }

  toggleFullScreen(tabFullScreen?: boolean) {
    this._isFullScreen ? this.closePreviewFullScreen() : this.openPreviewFullScreen(tabFullScreen ? tabFullScreen : null)
  }
  closePreviewFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    else if (document['mozCancelFullScreen']) {
      document['mozCancelFullScreen']();
    }
    else if (document['webkitExitFullscreen']) {
      document['webkitExitFullscreen']();
    }
    else if (document['msExitFullscreen']) {
      document['msExitFullscreen']();
    }
  }
  onFullScreenChange() {
    this._isFullScreen = !this._isFullScreen;
  }
  bindDocumentListeners() {
    this.onFullScreenListener = this.onFullScreenChange.bind(this);
    document.addEventListener("fullscreenchange", this.onFullScreenListener);
    document.addEventListener("mozfullscreenchange", this.onFullScreenListener);
    document.addEventListener("webkitfullscreenchange", this.onFullScreenListener);
    document.addEventListener("msfullscreenchange", this.onFullScreenListener);
  }

  unbindDocumentListeners() {
    document.removeEventListener("fullscreenchange", this.onFullScreenListener);
    document.removeEventListener("mozfullscreenchange", this.onFullScreenListener);
    document.removeEventListener("webkitfullscreenchange", this.onFullScreenListener);
    document.removeEventListener("msfullscreenchange", this.onFullScreenListener);
    this.onFullScreenListener = null;
  }
  openPreviewFullScreen(tabFullScreen?: boolean) {
    if (document.fullscreenElement) {
      document.exitFullscreen()
        .catch((err) => console.error(err))
    }
    else if (document['mozRequestFullScreen']) { /* Firefox */
      document['mozRequestFullScreen']();
    }
    else if (document['webkitRequestFullscreen']) { /* Chrome, Safari & Opera */
      document['webkitRequestFullscreen']();
    }
    else if (document['msRequestFullscreen']) { /* IE/Edge */
      document['msRequestFullscreen']();
    } else {
      const mainTag = document.getElementById('main') as any;
      tabFullScreen ? mainTag.requestFullscreen() : document.documentElement.requestFullscreen();
    }

  }
}
