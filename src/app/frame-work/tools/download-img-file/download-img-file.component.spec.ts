import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadImgFileComponent } from './download-img-file.component';

describe('DownloadImgFileComponent', () => {
  let component: DownloadImgFileComponent;
  let fixture: ComponentFixture<DownloadImgFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadImgFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadImgFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
