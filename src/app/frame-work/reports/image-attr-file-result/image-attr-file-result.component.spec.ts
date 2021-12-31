import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAttrFileResultComponent } from './image-attr-file-result.component';

describe('ImageAttrFileResultComponent', () => {
  let component: ImageAttrFileResultComponent;
  let fixture: ComponentFixture<ImageAttrFileResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageAttrFileResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageAttrFileResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
