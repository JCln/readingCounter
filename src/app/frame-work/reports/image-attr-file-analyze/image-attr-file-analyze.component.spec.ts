import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAttrFileAnalyzeComponent } from './image-attr-file-analyze.component';

describe('ImageAttrFileAnalyzeComponent', () => {
  let component: ImageAttrFileAnalyzeComponent;
  let fixture: ComponentFixture<ImageAttrFileAnalyzeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageAttrFileAnalyzeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageAttrFileAnalyzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
