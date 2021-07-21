import '../../../node_modules/leaflet-easyprint';
import '../../../src/assets/L.EasyButton/src/easy-button.js';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelpWrapperService } from 'services/help-wrapper.service';
import { ThemeService } from 'services/theme.service';

@Component({
  selector: 'app-frame-work',
  templateUrl: './frame-work.component.html',
  styleUrls: ['./frame-work.component.scss']
})
export class FrameWorkComponent implements OnInit {
  @Input() pageTitle: string = '';
  @Input() refreshPage: boolean;
  orderId;
  constructor(
    private route: ActivatedRoute,
    private helpWrapperService: HelpWrapperService,
    public themeService: ThemeService
  ) {
  }
  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('isShowMap');
  }
  // question on each section ////////////
  openDialog = () => {
    this.helpWrapperService.openDialog();
  }
  // ///////

}