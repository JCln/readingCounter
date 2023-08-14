import { AjaxReqWrapperService } from 'services/ajax-req-wrapper.service';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DNTCaptchaApiResponse } from 'src/app/classes/captcha-base';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {
  apiResponse = new DNTCaptchaApiResponse();
  hiddenInputName = 'dntCaptchaText';
  hiddenTokenName = 'dntCaptchaToken';
  inputName = 'dntCaptchaInputText';

  @Input() text: string;
  @Output() textChange = new EventEmitter<string>();

  @Input() token: string;
  @Output() tokenChange = new EventEmitter<string>();

  @Input() inputText: string;
  @Output() inputTextChange = new EventEmitter<string>();

  @Input() placeholder: string;
  @Input() apiUrl: string;
  @Input() backColor: string;
  @Input() fontName: string;
  @Input() fontSize: number;
  @Input() foreColor: string;
  @Input() max: number;
  @Input() min: number;

  constructor(
    public ajaxReqWrapperService: AjaxReqWrapperService
  ) { }

  ngOnInit() {
    this.doShow();
  }

  doShow = async () => {
    this.inputText = '';
    const data = await this.ajaxReqWrapperService.getDataSource(ENInterfaces.AuthsCaptchaApiShow);
    this.apiResponse = data;
    this.text = data.dntCaptchaTextValue;
    this.onTextChange();
    this.token = data.dntCaptchaTokenValue;
    this.onTokenChange();
  }
  onTextChange() {
    this.textChange.emit(this.text);
  }

  onTokenChange() {
    this.tokenChange.emit(this.token);
  }

  onInputTextChange() {
    this.inputTextChange.emit(this.inputText);
  }
}
