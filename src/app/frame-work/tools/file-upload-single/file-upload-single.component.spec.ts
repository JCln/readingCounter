import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadSingleComponent } from './file-upload-single.component';

describe('FileUploadSingleComponent', () => {
  let component: FileUploadSingleComponent;
  let fixture: ComponentFixture<FileUploadSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploadSingleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
