import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadImgTwoFileComponent } from './download-img-two-file.component';

describe('DownloadImgTwoFileComponent', () => {
  let component: DownloadImgTwoFileComponent;
  let fixture: ComponentFixture<DownloadImgTwoFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadImgTwoFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadImgTwoFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
