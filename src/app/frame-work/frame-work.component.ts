import '../../../node_modules/leaflet-easyprint';
import '../../../src/assets/L.EasyButton/src/easy-button.js';

import { Component, Input } from '@angular/core';
import { HelpWrapperService } from 'services/help-wrapper.service';
import { ThemeService } from 'services/theme.service';

@Component({
  selector: 'app-frame-work',
  templateUrl: './frame-work.component.html',
  styleUrls: ['./frame-work.component.scss']
})
export class FrameWorkComponent {
  @Input() pageTitle: string = '';
  @Input() refreshPage: boolean;

  constructor(
    private helpWrapperService: HelpWrapperService,
    public themeService: ThemeService
  ) {
  }

  // question on each section ////////////
  openDialog = () => {
    this.helpWrapperService.openDialog();
  }
  // ///////

}