import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-test-tinymce',
  templateUrl: './test-tinymce.component.html',
  styleUrls: ['./test-tinymce.component.scss']
})

export class TestTinymceComponent implements OnInit, AfterViewInit {
  tinymce: any;
  dataModel: any;
  innerValue;
  init = false;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  onChangeCallback: (_: any) => void = () => { };
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.tinymce.init({
      selector: 'testTinySelector',
      schema: 'text',
      setup: ed => {
        ed.on('init', ed2 => {
          if (this.innerValue) ed2.target.setContent(this.innerValue);
          this.init = true;
        });
      }
    });
  }
  get value(): any {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }
  updateValue() {
    const content = this.tinymce.activeEditor.getContent();
    this.value = this.sanitizer.bypassSecurityTrustHtml(content);
  }
  clickedButton = () => {
    console.log(this.dataModel);

  }

}
