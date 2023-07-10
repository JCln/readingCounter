import '../../../node_modules/leaflet-easyprint';
import '../../../src/assets/L.EasyButton/src/easy-button.js';

import { Component, Input, OnInit } from '@angular/core';
import { HelpWrapperService } from 'services/help-wrapper.service';
import { ThemeService } from 'services/theme.service';

@Component({
  selector: 'app-frame-work',
  templateUrl: './frame-work.component.html',
  styleUrls: ['./frame-work.component.scss']
})
export class FrameWorkComponent implements OnInit {
  onFullScreenListener: any;
  _isFullScreen: boolean = false;

  @Input() pageTitle: string = '';
  @Input() refreshPage: boolean;

  constructor(
    private helpWrapperService: HelpWrapperService,
    public themeService: ThemeService
  ) {
  }
  ngOnInit(): void {
    this.bindDocumentListeners();
  }
  // question on each section ////////////
  openDialog = () => {
    this.helpWrapperService.openDialog();
  }
  toggleFullScreen() {
    if (this._isFullScreen) {
      this.closePreviewFullScreen();
    }
    else {
      this.openPreviewFullScreen();
    }
  }
  openPreviewFullScreen() {
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
      document.documentElement.requestFullscreen();
    }

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
}